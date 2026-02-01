package main

import(
	"encoding/json"
	"fmt"
	"net/http"
)

//this file would listens for alerts and will eventually talk to the AI.

type Alert struct{
	AttackType string `json:"attackType"`
	Payload    string `json:"payload"`
	OriginIP   string `json:"originIP"`
}

func AlertHandler(w http.ResponseWriter, r *http.Request){
	if r.Method!="POST"{
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}else{
		var alert Alert
		err:=json.NewDecoder(r.Body).Decode(&alert)
		if err!=nil{
			http.Error(w, "Error decoding alert", http.StatusBadRequest)
			return
		}
		// Process the alert (for now, just print it)
		// we will eventually send this to the AI for analysis
		fmt.Println("\n[ORCHESTRATOR] SECURITY INCIDENT RECEIVED")
		fmt.Println("------------------------------------------------")
		fmt.Printf("TYPE:    %s\n", alert.AttackType)
		fmt.Printf("PAYLOAD: %s\n", alert.Payload)
		fmt.Printf("SOURCE:  %s\n", alert.OriginIP)
		fmt.Println("------------------------------------------------")
		fmt.Println("ACTION: Triggering AI Remediation Agent...")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Alert received"))
	}
}

func main(){
	http.HandleFunc("/webhook/alerts",AlertHandler)
	fmt.Println("Aegis Orchestrator Brain is online and listening for alerts...")
	port:=":3000"
	http.ListenAndServe(port, nil)
}