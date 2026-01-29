package main

import(
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strings"
)

//target to do is judging the user input with regex patterns and tell wether 
//they are a part of sql injection attack or not

func main(){
	//defining regex patterns
	sqlinjectionregex:=regexp.MustCompile(`(?i)(union\s+select|' OR '1'='1|--;)`)
	//reading input from user
	read1:=bufio.NewReader(os.Stdin)
	fmt.Print("Enter your input: ")
	userinput,err:=read1.ReadString('\n')
	if(err!=nil){
		fmt.Println("error reading user input")
	}else{
		userinput=strings.TrimSpace(userinput)
		//checking for sql injection patterns now
		if(sqlinjectionregex.MatchString(userinput)){
			fmt.Println("RESULT: DANGEROUS INPUT DETECTED!")
			fmt.Println("Type: Potential SQL Injection")
			fmt.Println("Action: [Would redirect to Shadow Container]")
		}else{
			fmt.Println("RESULT: SAFE")
			fmt.Println("Action: [Would forward to Live App]")
		}
	}
}