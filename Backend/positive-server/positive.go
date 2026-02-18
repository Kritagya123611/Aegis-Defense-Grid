//positive.go

package main

import (
	"fmt"
	"net/http"
)

//a simple web server which would host a simple message for the user which is legitimate
func positive(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type", "text/html")
	fmt.Fprintln(w, "<h1> Welcome to Aegis Defense Grid!</h1>")
	fmt.Fprintln(w, "<p>You are in the <b>POSITIVE (Safe)</b> Environment.</p>")
	fmt.Fprintln(w, "<p>Status: <span style='color:green'>SECURE</span></p>")
	fmt.Println("[Positive Server] A user just visited the safe page.")
}

func main(){
	http.HandleFunc("/",positive)
	fmt.Println("Aegis Positive Server is running on port 8081")
	fmt.Println("Test Link: http://localhost:8081/")
	http.ListenAndServe(":8081", nil)
}