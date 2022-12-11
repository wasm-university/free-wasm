package main

import (
	"fmt"
	"strings"
	"unsafe"
)

func main() {}

// Allocate the in-Wasm memory region and returns its pointer to host.

//export alloc
func alloc(size uint32) *byte {
	buf := make([]byte, size)
	return &buf[0] // return starting position
}

//export hello
func hello(subject *uint32, length int) uint64 {

	fmt.Println("[tinygo]length:", length)

	var subjectStr strings.Builder
	pointer := uintptr(unsafe.Pointer(subject))
	// "parse" memory
	for i := 0; i < length; i++ {
		s := *(*int32)(unsafe.Pointer(pointer + uintptr(i)))
		fmt.Println("[tinygo]-->", i, string(byte(s)))
		subjectStr.WriteByte(byte(s))
	}

	output := subjectStr.String()
	fmt.Println("[tinygo]string param:", output)
	message := "👋 hello " + output
	buf := []byte(message)
	bufPtr := &buf[0]
	unsafePtr := uintptr(unsafe.Pointer(bufPtr))
	ptr := uint32(unsafePtr)
	size := uint32(len(buf))

	ret := (uint64(ptr) << uint64(32)) | uint64(size)

	return ret
}
