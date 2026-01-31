package main

import (
	"fmt"
	"net/http"
	"net/url" // <--- NEW IMPORT: Needed for decoding
)

func sqlinjection(w http.ResponseWriter, r *http.Request) {
	// 1. Get the raw payload (e.g., "q=admin%27OR%271%27=%271")
	rawPayload := r.URL.RawQuery

	// 2. DECODE IT (Convert "%27" back to "'")
	// This makes "admin%27" become "admin'" so the Regex can see it.
	decodedPayload, err := url.QueryUnescape(rawPayload)
	if err != nil {
		fmt.Println("Error decoding URL:", err)
		decodedPayload = rawPayload // Fallback to raw if decoding fails
	}

	// 3. Check Logic using the DECODED payload
	if AnalyzeTraffic(decodedPayload) {
		fmt.Println("[DANGER] Input detected:", decodedPayload)
		fmt.Println("Action: Redirecting to Shadow Container on 8082")
		
		// Send the ORIGINAL raw payload to the trap (so the link still works)
		trapURL := "http://localhost:8082/?" + rawPayload
		http.Redirect(w, r, trapURL, http.StatusTemporaryRedirect)

	} else {
		fmt.Println("[SAFE] Input clean:", decodedPayload)
		fmt.Println("Action: Forwarding to Live App on 8081")
		
		http.Redirect(w, r, "http://localhost:8081", http.StatusTemporaryRedirect)
	}
}

func main() {
	http.HandleFunc("/sqlinjection", sqlinjection)
	
	fmt.Println("Aegis Server is running on port 8080")
	fmt.Println("Test Link: http://localhost:8080/sqlinjection?q=admin'OR'1'='1")
	
	http.ListenAndServe(":8080", nil)
}