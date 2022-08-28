package main

import (
	"syscall/js"
)

func Hello(this js.Value, args []js.Value) interface{} {
	// get the first parameter
	human := args[0]

	firstName := human.Get("firstName").String()
	lastName := human.Get("lastName").String()

	return map[string]interface{} {
		"greetings": "Hello " + firstName + " " + lastName,
		"author":  "@k33g_org",
    "message": "👋 Hello World 🌍",
	}
}

func main() {
	js.Global().Set("Hello", js.FuncOf(Hello))
	<-make(chan bool)
}
