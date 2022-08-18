package main

import "fmt"

// This is the entrypoint into our go module
func main() {
  fmt.Println("👋 Hello from TinyGo")
}


/*
This exports an add function.
It takes in two 32-bit integer values
And returns a 32-bit integer value.
To make this function callable from JavaScript,
we need to add the: "export add" comment above the function
*/

//export add
func add(x int, y int) int {
  return x + y;
}
