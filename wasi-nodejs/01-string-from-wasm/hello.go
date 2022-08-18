package main

func main() { }

//export hello
func hello() *byte {
  return &(([]byte)("hello world")[0])
}

/*
- convert the string to an array of bytes
- get the position of the first byte of the array
- return a pointer of the byte
*/


