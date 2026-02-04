package main

import (
    "net/http"
    "regexp"
)

func main() {
    http.HandleFunc("/", handleRequest)
    http.ListenAndServe(":8080", nil)
}

func handleRequest(w http.ResponseWriter, r *http.Request) {
    // Regular expression to detect SQL injection attempts
    regex := regexp.MustCompile(`('|")?admin\s*OR\s*('|")?\s*=\s*('|")?\s*1\s*('|")?`)

    // Check if the request contains the SQL injection pattern
    if regex.MatchString(r.URL.RawQuery) {
        http.Error(w, "SQL injection attempt detected", http.StatusForbidden)
        return
    }

    // Process the request as usual
    w.Write([]byte("Request processed successfully"))
}