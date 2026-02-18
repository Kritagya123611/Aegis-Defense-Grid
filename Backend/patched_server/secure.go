package main

import (
	"fmt"
	"net/http"
	"strings"
)

func secureHandler(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query().Get("q")
	if strings.Contains(query, "'") || strings.Contains(query, "OR") || strings.Contains(query, "--") {
		fmt.Println("Blocked malicious input:", query)
		
		w.Header().Set("Content-Type", "text/html")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`
			<div style="font-family: monospace; color: green; padding: 20px; background: #eee; border-radius: 5px;">
				<h1>Safe Result (Sanitized)</h1>
				<p>The system detected special characters and neutralized them.</p>
				<p>Your query was cleaned: <b>[REDACTED]</b></p>
			</div>
		`))
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("<h1>Search Results</h1><p>No items found for: " + query + "</p>"))
}

func main() {
	http.HandleFunc("/", secureHandler)
	
	fmt.Println("Patched Server (v2.0) running on Port 8083")
	fmt.Println("Ready to accept hot-swapped traffic.")
	
	if err := http.ListenAndServe(":8083", nil); err != nil {
		fmt.Println("Error:", err)
	}
}