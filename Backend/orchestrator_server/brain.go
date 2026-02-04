//brain.go
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	//"log"
	"net/http"
	"os"
	"os/exec"
	//"regexp"
	"strings"
	"github.com/joho/godotenv"
)

// --- CONFIGURATION ---
var COHERE_API_KEY string
const COHERE_URL = "https://api.cohere.ai/v1/chat"

type AlertPayload struct {
	AttackType string `json:"attackType"`
	Payload    string `json:"payload"`
	OriginIP   string `json:"originIP"`
}

type CohereRequest struct {
	Model   string `json:"model"`
	Message string `json:"message"`
}

type CohereResponse struct {
    Text string `json:"text"` // The direct response text
}


func cleanCode(code string) string {
    // Find where the code actually starts
    start := strings.Index(code, "package main")
    if start == -1 { return code } // Fallback

    // Find where the code ends
    end := strings.LastIndex(code, "}")
    if end == -1 { return code } // Fallback

    return code[start : end+1]
}

// 1. Send Analysis back to Proxy Dashboard
func sendAnalysisToProxy(analysisText string) {
	payload := map[string]string{"analysis": analysisText}
	jsonData, _ := json.Marshal(payload)
	
	// Send to the Proxy's new endpoint
	resp, err := http.Post("http://localhost:8080/api/threats/update", "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		fmt.Println(" Failed to update Dashboard:", err)
	} else {
		defer resp.Body.Close()
		fmt.Println(" AI Analysis sent to Dashboard.")
	}
}

func deployHotPatch(code string) {
	fmt.Println("\n[AUTOPILOT] Deploying Hot Patch...")
	cleanedCode := cleanCode(code)
	if _, err := os.Stat("../patched_server"); os.IsNotExist(err) {
		os.Mkdir("../patched_server", 0755)
	}
	err := os.WriteFile("../patched_server/secure.go", []byte(cleanedCode), 0644)
	if err != nil {
		fmt.Println(" Error writing patch file:", err)
		return
	}
	
	cmd := exec.Command("go", "run", "secure.go")
	cmd.Dir = "../patched_server"
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	
	err = cmd.Start()
	if err != nil {
		fmt.Println(" Error starting patched server:", err)
		return
	}
	fmt.Println("   -->  Patched Server Started on Port 8083!")

	http.Get("http://localhost:8080/admin/hotswap?port=8083")
}

func extractTextFromCohere(body []byte) string {
    var resp CohereResponse
    if err := json.Unmarshal(body, &resp); err != nil {
        fmt.Println("JSON Unmarshal Error:", err)
        return ""
    }
    return resp.Text
}

func isValidGoCode(code string) bool {
    trimmed := strings.TrimSpace(code)
    // A valid Go file MUST start with the package keyword
    return strings.HasPrefix(trimmed, "package")
}

func extractSummary(text string) string {
	for _, line := range strings.Split(text, "\n") {
		if strings.HasPrefix(line, "SUMMARY:") {
			return line
		}
	}
	return "SUMMARY: SQL Injection attempt detected and mitigated."
}


func askCohere(alert AlertPayload) (summary string, goCode string) {
	// In askCohere function
prompt := fmt.Sprintf(
    "Classify this input: '%s'. "+
    "If it is a real attack, provide a 1-sentence analysis and a Go program to detect it. "+
    "If it is HARMLESS, simply return the word 'CLEAR' and nothing else.",
    alert.Payload,
)

	reqBody := CohereRequest{
		Model:   "command-r-08-2024",
		Message: prompt,
	}

	jsonData, _ := json.Marshal(reqBody)

	req, _ := http.NewRequest("POST", COHERE_URL, bytes.NewBuffer(jsonData))
	req.Header.Set("Authorization", "Bearer "+COHERE_API_KEY)
	req.Header.Set("Content-Type", "application/json")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		fmt.Println(" Cohere request failed:", err)
		return "", ""
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)

	fmt.Println("\n[COHERE RAW RESPONSE]")
	fmt.Println(string(body))
	fmt.Println("[END RAW RESPONSE]\n")

	text := extractTextFromCohere(body)
	summary = extractSummary(text)
	goCode = cleanCode(text)

	if !isValidGoCode(goCode) {
		fmt.Println("[AUTOPILOT]  AI did not return valid Go code. Aborting deploy.")
		return summary, ""
	}

	return summary, goCode
}



func alertHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Println("\n[ORCHESTRATOR] Incoming request from", r.RemoteAddr)
    fmt.Println("[ORCHESTRATOR] Method:", r.Method)

    var alert AlertPayload
    if err := json.NewDecoder(r.Body).Decode(&alert); err != nil {
        fmt.Println("Decode error:", err)
        w.WriteHeader(http.StatusBadRequest)
        return
    }

    fmt.Println("[ORCHESTRATOR] INCIDENT RECEIVED")
    fmt.Println("  Type   :", alert.AttackType)
    fmt.Println("  Payload:", alert.Payload)
    fmt.Println("  Origin :", alert.OriginIP)

    fmt.Println("[ORCHESTRATOR] Analyzing...")

    summary, goCode := askCohere(alert)

if strings.TrimSpace(summary) == "CLEAR" || strings.TrimSpace(goCode) == "CLEAR" {
    fmt.Println("[ORCHESTRATOR] Input is harmless. Skipping deploy.")
    sendAnalysisToProxy("Input analyzed: No threat detected.")
    w.Write([]byte(`{"status":"clear"}`))
    return // Exit early, don't try to deploy
}

	go sendAnalysisToProxy(summary)
    if goCode != "" {
        deployHotPatch(goCode)
        w.Write([]byte(`{"status":"patched"}`))
    } else {
        w.Write([]byte(`{"status":"failed"}`))
    }
}


func main() {
	godotenv.Load()
	COHERE_API_KEY = os.Getenv("COHERE_API_KEY")
	
	http.HandleFunc("/webhook/alerts", alertHandler)
	
	port := ":3000"
	fmt.Println("Aegis Orchestrator running on port", port)
	http.ListenAndServe(port, nil)
}