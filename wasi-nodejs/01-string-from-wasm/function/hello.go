package main

func main() { }

//export hello
func hello() *byte {
  return &(([]byte)("hello world")[0])
}


