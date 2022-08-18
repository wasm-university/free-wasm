package main

import (
	"fmt"
	"os"
)

var buf [1024]byte

//export getBuffer
func getBuffer() *byte {
   return &buf[0]
}

// Declare a main function, this is the entrypoint into our go module
// That will be run. In our example, we won't need this
func main() {
  fmt.Println("👋 hello from the main method")
  argsWithProg := os.Args
  argsWithoutProg := os.Args[1:]
  fmt.Println(argsWithProg)
  fmt.Println(argsWithoutProg)

  fmt.Println("VERSION:", os.Getenv("VERSION"))
  fmt.Println("NAME:", os.Getenv("NAME"))

}


//export echo
func echo(message string) {
  fmt.Println("🦊 echo:", message)
}

//export hello
func hello(parameters string) *byte {
  fmt.Println("🎃", parameters)
  var returnedValue [50]byte //arbitrary length
  fmt.Println("🤖 from the hello function:", parameters)
  copy(returnedValue[:], "👋 Hello " + parameters)
  return &(returnedValue[0])
}

/*
func hello(parameters *int32) *byte {
	name := helpers.FromInt32PtrToString(parameters)
  fmt.Println(name)
	returnValue := "Hello " + name
	return helpers.FromStringToBytePtr(returnValue)
}
*/
