package main

import (
	"fmt"
	"net/http"
	"net/url" 
)

func sqlinjection(w http.ResponseWriter, r *http.Request) {
	rawPayload := r.URL.RawQuery
	decodedPayload, err := url.QueryUnescape(rawPayload)
	if err != nil {
		fmt.Println("Error decoding URL:", err)
		decodedPayload = rawPayload 
	}
	if AnalyzeTraffic(decodedPayload) {
		fmt.Println("[DANGER] Input detected:", decodedPayload)
		fmt.Println("Action: Redirecting to Shadow Container on 8082")
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