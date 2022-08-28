package main

import (
	"log"
	"reflect"
	"syscall/js"
)


func Hello(this js.Value, args []js.Value) interface{} {

	// get the first parameter
	human := args[0]

	log.Println("[From Go] 🖐️ human type:", reflect.TypeOf(human))

	// get members of human
  /*
    {
      firstName: "Bob",
      lastName: "Morane"
    }
  */
	firstName := human.Get("firstName").String()
	lastName := human.Get("lastName").String()

  // a map whose keys are strings and values are any type
	return map[string]interface{} {
		"greetings": "Hello " + firstName + " " + lastName,
		"author":  "@k33g_org",
    "message": "👋 n'oublie pas d'ouvrir la console 😃",
	}

}

func main() {

	js.Global().Set("Hello", js.FuncOf(Hello))

	<-make(chan bool)
}
