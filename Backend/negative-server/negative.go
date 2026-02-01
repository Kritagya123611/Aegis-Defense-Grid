package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

// 1. Define the Data Structure (Must match brain.go)
type AlertPayload struct {
	AttackType string `json:"attackType"`
	Payload    string `json:"payload"`
	OriginIP   string `json:"originIP"`
}

// 2. The "Snitch" Function
func sendAlertToBrain(payload string) {
	// Prepare the JSON data
	data := AlertPayload{
		AttackType: "SQL Injection",
		Payload:    payload,
		OriginIP:   "192.168.1.X (Attacker)",
	}
	jsonData, _ := json.Marshal(data)

	// Send POST request to the Brain
	brainURL := "http://localhost:3000/webhook/alerts" 
	
	resp, err := http.Post(brainURL, "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		fmt.Println("Failed to contact Brain:", err)
		return
	}
	defer resp.Body.Close()
	fmt.Println("[SIGNAL SENT] Incident reported to Orchestrator.")
}

func negative(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query().Get("q")
	
	w.Header().Set("Content-Type", "text/html")

	if strings.Contains(query, "'OR'1'='1") || strings.Contains(query, "admin") {
		fmt.Println("[SHADOW LOG] Attacker accessed Fake Admin DB!")
		go sendAlertToBrain(query)
		fmt.Fprintln(w, "<h1>DATABASE ERROR: Table Dump Leaked</h1>")
		fmt.Fprintln(w, "<pre style='background:#eee; padding:10px;'>")
		fmt.Fprintln(w, "ID | USER     | PASSWORD_HASH")
		fmt.Fprintln(w, "---|----------|------------------")
		fmt.Fprintln(w, " 1 | admin    | flag{nice_try_hacker}") 
		fmt.Fprintln(w, "</pre>")
	} else {
		// Normal Page (if they visit without a hack)
		fmt.Fprintln(w, "<h1>Access Denied</h1>")
		fmt.Fprintln(w, "<p>You are in the <b>NEGATIVE (Shadow)</b> Environment.</p>")
	}
}

func main() {
	http.HandleFunc("/", negative)
	fmt.Println("Aegis Shadow/Negative Server running on port 8082")
	http.ListenAndServe(":8082", nil)
}