package main

import (
	"fmt"
	"net/http"
)

func sqlinjection(w http.ResponseWriter, r *http.Request) {
	// 1. Get the payload
	payload := r.URL.RawQuery

	// 2. Check Logic
	if AnalyzeTraffic(payload) {
		// LOG TO TERMINAL (Standard Output) - For you to see
		fmt.Println("[DANGER] Input detected:", payload)
		fmt.Println("   Action: Redirecting to Shadow Container (Google)")
		
		// REDIRECT BROWSER - For the user
		http.Redirect(w, r, "https://www.google.com", http.StatusTemporaryRedirect)
	} else {
		// LOG TO TERMINAL
		fmt.Println("[SAFE] Input clean:", payload)
		fmt.Println("   Action: Forwarding to Live App (Bing)")
		
		// REDIRECT BROWSER
		http.Redirect(w, r, "https://www.bing.com", http.StatusTemporaryRedirect)
	}
}

func main() {
	http.HandleFunc("/shreya", sqlinjection)
	fmt.Println("Aegis Server is running on port 8080")
	fmt.Println("Test Link: http://localhost:8080/shreya?q=hello")
	
	// Start the server
	http.ListenAndServe(":8080", nil)
}