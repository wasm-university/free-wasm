package main

import (
  "unsafe"
  "fmt"
)

// Declare a main function, this is the entrypoint into our go module
// That will be run.
func main() { }

//export hello
func hello() uint64 { // ptrAndSize

  message := "hello world"
	buf := []byte(message)
	bufPtr := &buf[0]
	unsafePtr := uintptr(unsafe.Pointer(bufPtr))

  ptr := uint32(unsafePtr)
  size := uint32(len(buf))

  fmt.Println("ptr:", ptr)
  fmt.Println("size", size)
  ret := (uint64(ptr) << uint64(32)) | uint64(size)

  fmt.Println("ret:", ret)

	return ret
}

