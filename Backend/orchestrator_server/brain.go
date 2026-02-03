package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"github.com/joho/godotenv"
)

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
	Text string `json:"text"` 
}

func askCohere(alert AlertPayload) string {
	prompt := fmt.Sprintf(
		"You are a Cyber Security Expert. I have detected an attack.\n"+
		"Type: %s\n"+
		"Payload: %s\n"+
		"Analyze this attack and explain broadly what it tries to do. Then, provide a Go code snippet to fix the vulnerability.",
		alert.AttackType, alert.Payload,
	)

	reqBody := CohereRequest{
		Model:   "command-r-plus-08-2024", 
		Message: prompt,
	}
	jsonData, _ := json.Marshal(reqBody)
	req, err := http.NewRequest("POST", COHERE_URL, bytes.NewBuffer(jsonData))
	if err != nil {
		return "Error creating request: " + err.Error()
	}
	req.Header.Set("Authorization", "Bearer "+COHERE_API_KEY)
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Accept", "application/json")
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "Error contacting Cohere: " + err.Error()
	}
	defer resp.Body.Close()
	body, _ := io.ReadAll(resp.Body)

	if resp.StatusCode != 200 {
		fmt.Println("\n[DEBUG] COHERE API ERROR:")
		fmt.Printf("Status: %d\n", resp.StatusCode)
		fmt.Printf("Body: %s\n", string(body))
		return "Cohere Request Failed (See logs)"
	}

	var cohereResp CohereResponse
	if err := json.Unmarshal(body, &cohereResp); err != nil {
		return "Error parsing JSON: " + err.Error()
	}

	return cohereResp.Text
}

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

	fmt.Println("\n[ORCHESTRATOR] SECURITY INCIDENT RECEIVED")
	fmt.Printf("PAYLOAD: %s\n", alert.Payload)
	fmt.Println("ACTION: Contacting Cohere AI (Command R)...")
	aiAnalysis := askCohere(alert)

	fmt.Println("\n [COHERE AI ANALYSIS]:")
	fmt.Println("------------------------------------------------")
	fmt.Println(aiAnalysis)
	fmt.Println("------------------------------------------------")

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"status":"analyzed"}`))
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Warning: .env file not found. Assuming env vars are set manually.")
	}

	//setting the key from env variable
	COHERE_API_KEY = os.Getenv("COHERE_API_KEY")
	if COHERE_API_KEY == "" {
		log.Fatal("FATAL: COHERE_API_KEY is missing in .env file!")
	}

	http.HandleFunc("/webhook/alerts", alertHandler)
	port := ":3000"
	fmt.Println("Aegis Orchestrator (Powered by Cohere) running on port", port)
	http.ListenAndServe(port, nil)
}