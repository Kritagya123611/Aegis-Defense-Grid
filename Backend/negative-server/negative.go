package main

import (
	"fmt"
	"net/http"
)

//a negative server which is replica of the positive server 
func negative(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type", "text/html")
	
	fmt.Fprintln(w, "<h1> Welcome to Aegis Defense Grid!</h1>")
	fmt.Fprintln(w, "<p>You are in the <b>NEGATIVE (Unsafe)</b> Environment.</p>")
	fmt.Fprintln(w, "<p>Status: <span style='color:red'>UNSAFE</span></p>")
	fmt.Println("[Negative Server] A user just visited the unsafe page.")
}

func main(){
	http.HandleFunc("/",negative)
	fmt.Println("Aegis negative Server is running on port 8082")
	fmt.Println("Test Link: http://localhost:8082/")
	http.ListenAndServe(":8082", nil)
}