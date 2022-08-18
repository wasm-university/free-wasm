package helpers

import (
	"strings"
	"unsafe"
)

// Return string from pointer
// Used for transform the parameter "sent" by the host to string
func FromInt32PtrToString(value *int32) string {
	nth := 0
	var valueStr strings.Builder
	pointer := uintptr(unsafe.Pointer(value))
	for {
		s := *(*int32)(unsafe.Pointer(pointer + uintptr(nth)))
		if s == 0 {
			break;
		}

		valueStr.WriteByte(byte(s))
		nth++
	}

	output := valueStr.String()
	return output
}


// Return byte pointer
// Used to transform the string result to pointer, to "send" the result to the host
func FromStringToBytePtr(returnValue string) *byte {
	return &(([]byte)(returnValue)[0])
}

