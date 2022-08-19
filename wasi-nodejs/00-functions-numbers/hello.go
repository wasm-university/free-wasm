package main

import "fmt"

// This is the entrypoint into our go module
func main() {
  fmt.Println("👋 Hello from TinyGo")
}

//export add
func add(x int, y int) int {
  return x + y
}

//export sayHello
func sayHello(name string) string {
  return "hello " + name
}

