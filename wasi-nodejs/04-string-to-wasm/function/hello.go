package main

import (
  "unsafe"
  "fmt"
  "strings"
)

func main() { }


//export alloc
func alloc(size uint32) *byte {
	// Allocate the in-Wasm memory region and returns its pointer to hosts.
	// The region is supposed to store random strings generated in hosts,
	// meaning that this is called "inside" of host_get_string.
	buf := make([]byte, size)
	return &buf[0]
}

//export hello
func hello(subject *uint32, length int) uint64 { // ptrAndSize

  // https://radu-matei.com/blog/practical-guide-to-wasm-memory/#exchanging-strings-between-modules-and-runtimes
  // https://wasmedge.org/book/en/embed/go/memory.html#pass-strings-to-tinygo-functions

  fmt.Println("🤖", length)

  var subjectStr strings.Builder
  pointer := uintptr(unsafe.Pointer(subject))
  for i := 0; i < length; i++ {
    s := *(*int32)(unsafe.Pointer(pointer + uintptr(i)))
    fmt.Println("🤖🤖", i, s)
    subjectStr.WriteByte(byte(s))
  }

  output := subjectStr.String()

  message := "👋 hello " + output
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

