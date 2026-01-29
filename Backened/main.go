package main

import (
	"fmt"
	"net/http"
)

func sqlinjection(w http.ResponseWriter, r *http.Request) {

	payload := r.URL.RawQuery

	if AnalyzeTraffic(payload) {
		fmt.Fprintln(w, "RESULT: DANGEROUS INPUT DETECTED")
		fmt.Fprintln(w, "Action: Redirect to Shadow Container")
	} else {
		fmt.Fprintln(w, "RESULT: SAFE")
		fmt.Fprintln(w, "Action: Forward to Live App")
	}
}

func main() {
	http.HandleFunc("/shreya", sqlinjection)
	fmt.Println("Server is running on port 8080")
	http.ListenAndServe(":8080", nil)
}
