package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

// --- CONFIGURATION ---
// ⚠️ REPLACE THIS WITH YOUR COHERE API KEY
const COHERE_API_KEY = "PaYWOrQMhtRKXsjnkeSDpriqQTyEK6zb7gOI32zF"

// Cohere's Chat Endpoint
const COHERE_URL = "https://api.cohere.ai/v1/chat"

// --- DATA STRUCTURES ---

// 1. Incoming Alert (From Shadow Server)
type AlertPayload struct {
	AttackType string `json:"attackType"`
	Payload    string `json:"payload"`
	OriginIP   string `json:"originIP"`
}

// 2. Cohere Request Structure
// Cohere expects a "message" field, not "contents" like Google
type CohereRequest struct {
	Model   string `json:"model"`
	Message string `json:"message"`
}

// 3. Cohere Response Structure
type CohereResponse struct {
	Text string `json:"text"` // The answer is directly in "text"
}

// --- FUNCTION TO CALL COHERE ---
func askCohere(alert AlertPayload) string {
	// 1. Construct the prompt
	prompt := fmt.Sprintf(
		"You are a Cyber Security Expert. I have detected an attack.\n"+
		"Type: %s\n"+
		"Payload: %s\n"+
		"Analyze this attack and explain broadly what it tries to do. Then, provide a Go code snippet to fix the vulnerability.",
		alert.AttackType, alert.Payload,
	)

	// 2. Prepare JSON for Cohere
	// We use "command-r" which is their best model for code/reasoning
	// Updated to the current available model (2026)
	reqBody := CohereRequest{
		Model:   "command-r-plus-08-2024", // specific stable version
		Message: prompt,
	}
	jsonData, _ := json.Marshal(reqBody)

	// 3. Create the Request
	req, err := http.NewRequest("POST", COHERE_URL, bytes.NewBuffer(jsonData))
	if err != nil {
		return "Error creating request: " + err.Error()
	}

	// 4. Set Headers (Cohere needs a Bearer Token)
	req.Header.Set("Authorization", "Bearer "+COHERE_API_KEY)
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Accept", "application/json")

	// 5. Send Request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "Error contacting Cohere: " + err.Error()
	}
	defer resp.Body.Close()

	// 6. Read Response
	body, _ := io.ReadAll(resp.Body)

	// --- DEBUG: Print error if not 200 OK ---
	if resp.StatusCode != 200 {
		fmt.Println("\n⚠️ [DEBUG] COHERE API ERROR:")
		fmt.Printf("Status: %d\n", resp.StatusCode)
		fmt.Printf("Body: %s\n", string(body))
		return "Cohere Request Failed (See logs)"
	}

	// 7. Parse Response
	var cohereResp CohereResponse
	if err := json.Unmarshal(body, &cohereResp); err != nil {
		return "Error parsing JSON: " + err.Error()
	}

	return cohereResp.Text
}

// --- HTTP HANDLER ---
func alertHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var alert AlertPayload
	err := json.NewDecoder(r.Body).Decode(&alert)
	if err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	fmt.Println("\n🚨 [ORCHESTRATOR] SECURITY INCIDENT RECEIVED")
	fmt.Printf("PAYLOAD: %s\n", alert.Payload)
	fmt.Println("🤖 ACTION: Contacting Cohere AI (Command R)...")

	// CALL COHERE
	aiAnalysis := askCohere(alert)

	fmt.Println("\n💡 [COHERE AI ANALYSIS]:")
	fmt.Println("------------------------------------------------")
	fmt.Println(aiAnalysis)
	fmt.Println("------------------------------------------------")

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"status":"analyzed"}`))
}

func main() {
	http.HandleFunc("/webhook/alerts", alertHandler)
	port := ":3000"
	fmt.Println("🧠 Aegis Orchestrator (Powered by Cohere) running on port", port)
	http.ListenAndServe(port, nil)
}