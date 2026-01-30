package main

import (
	"fmt"
	"net/http"
)

//a simple web server which would host a simple message for the user which is legitimate
func positive(w http.ResponseWriter, r *http.Request){
	fmt.Println("Welcome to Aegis Defense Grid!")
	fmt.Println("this one is for the real user experience!")
}

func positiveServer(){
	http.HandleFunc("/positive",positive)
	fmt.Println("Aegis Positive Server is running on port 8080")
	fmt.Println("Test Link: http://localhost:8080/positive")
	http.ListenAndServe(":8080", nil)
}