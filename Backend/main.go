//main.go

package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	//"regexp"
	"sync"
)

// --- CONFIGURATION ---
var (
	CurrentTrapPort = "8082" 
	mutex           sync.RWMutex
	Blacklist       = make(map[string]bool)
)

// --- API STRUCTURES ---
type ApiRequest struct {
	Query string `json:"query"`
}

type ApiResponse struct {
	Verdict     string `json:"verdict"`     // "SAFE" or "DANGER"
	Destination string `json:"destination"` // e.g. "Shadow Trap :8082"
	Details     string `json:"details"`
}

// 2. Admin API: Hot Swap / Traffic Shift
func hotSwapHandler(w http.ResponseWriter, r *http.Request) {
	// Enable CORS
	enableCors(&w)
	if r.Method == "OPTIONS" { return }

	newPort := r.URL.Query().Get("port")
	if newPort != "" {
		mutex.Lock()
		CurrentTrapPort = newPort
		mutex.Unlock()
		fmt.Printf("🔄 [HOT SWAP] Traffic shifted! Hackers now routed to Port %s\n", newPort)
		w.Write([]byte("Swapped"))
	}
}

// 3. Admin API: Ban IP
func banHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	if r.Method == "OPTIONS" { return }

	ip := r.URL.Query().Get("ip")
	if ip != "" {
		mutex.Lock()
		Blacklist[ip] = true
		mutex.Unlock()
		fmt.Printf("⛔ [FIREWALL] IP %s BANNED.\n", ip)
		w.Write([]byte("Banned"))
	}
}

// 4. NEW: JSON API Handler for React Frontend
func apiAnalyzeHandler(w http.ResponseWriter, r *http.Request) {
	// A. Handle CORS
	enableCors(&w)
	if r.Method == "OPTIONS" {
		return
	}

	// B. Parse JSON Body
	var req ApiRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// C. Analyze Logic (Reusing your core function)
	// Note: We don't need to URL-decode JSON body, it comes in raw string
	isDanger := AnalyzeTraffic(req.Query)
	
	resp := ApiResponse{}

	if isDanger {
		mutex.RLock()
		trapPort := CurrentTrapPort
		mutex.RUnlock()

		resp.Verdict = "DANGER"
		resp.Destination = fmt.Sprintf("Shadow Trap (:%s)", trapPort)
		resp.Details = "Malicious pattern detected (Regex Heuristics). Request diverted to Honeypot."
		
		fmt.Printf("❌ [API CHECK] DANGER DETECTED: %s\n", req.Query)
	} else {
		resp.Verdict = "SAFE"
		resp.Destination = "Live App (:8081)"
		resp.Details = "Traffic matches normal usage patterns. Forwarded to Safe Zone."
		
		fmt.Printf("✅ [API CHECK] SAFE QUERY: %s\n", req.Query)
	}

	// D. Send JSON Response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}

// 5. Existing Browser Redirect Handler (Keep this for the manual demo!)
func sqlinjection(w http.ResponseWriter, r *http.Request) {
	userIP := "192.168.1.X"
	mutex.RLock()
	isBanned := Blacklist[userIP]
	trapPort := CurrentTrapPort
	mutex.RUnlock()

	if isBanned {
		http.Error(w, "⛔ ACCESS DENIED: Active Defense System.", http.StatusForbidden)
		return
	}

	rawPayload := r.URL.RawQuery
	decodedPayload, _ := url.QueryUnescape(rawPayload)

	if AnalyzeTraffic(decodedPayload) {
		fmt.Printf("❌ [BROWSER] Redirecting to Port %s...\n", trapPort)
		trapURL := fmt.Sprintf("http://localhost:%s/?%s", trapPort, rawPayload)
		http.Redirect(w, r, trapURL, http.StatusTemporaryRedirect)
	} else {
		fmt.Println("✅ [BROWSER] Forwarding to Live App...")
		http.Redirect(w, r, "http://localhost:8081", http.StatusTemporaryRedirect)
	}
}

// Helper: Enable CORS
func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func main() {
	// Original Browser Endpoint
	http.HandleFunc("/sqlinjection", sqlinjection)
	
	// NEW React Endpoint
	http.HandleFunc("/api/analyze", apiAnalyzeHandler)
	
	// Admin Endpoints
	http.HandleFunc("/admin/ban", banHandler)
	http.HandleFunc("/admin/hotswap", hotSwapHandler)

	fmt.Println("🛡️ Aegis Proxy running on port 8080")
	fmt.Println("   ├── 🌍 Browser Mode: http://localhost:8080/sqlinjection")
	fmt.Println("   └── ⚛️  React Mode:   http://localhost:8080/api/analyze")
	
	http.ListenAndServe(":8080", nil)
}