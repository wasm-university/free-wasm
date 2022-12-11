
package main

import "fmt"

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
