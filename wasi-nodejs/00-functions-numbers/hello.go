package main

import "fmt"

/*
V8 uses a custom WASI libc implementation based on libuv, and the fd_write system call is implemented by V8 , which exposes a small public API for interacting with WASI in JavaScript.
See: https://radu-matei.com/blog/nodejs-wasi/
Seee: https://github.com/nodejs/node/blob/ac6ecd6b7f5949950d600de21488440f9f98c961/src/node_wasi.cc#L969-L1017
*/

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
  return x + y
}

//export sayHello
func sayHello(name string) string {
  return "hello " + name
}

