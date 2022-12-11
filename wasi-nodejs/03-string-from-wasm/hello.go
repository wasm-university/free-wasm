package main

import (
	"fmt"
	"unsafe"
)

func main() {}

//export hello
func hello() uint64 { // ptrAndSize

	message := "hello world"
	buf := []byte(message)
	bufPtr := &buf[0]
	unsafePtr := uintptr(unsafe.Pointer(bufPtr))

	ptr := uint32(unsafePtr)
	size := uint32(len(buf))

	fmt.Println("[tinygo]ptr:", ptr)
	fmt.Println("[tinygo]size:", size)

	ret := (uint64(ptr) << uint64(32)) | uint64(size)

	fmt.Println("[tinygo]ret:", ret)

	return ret
}
