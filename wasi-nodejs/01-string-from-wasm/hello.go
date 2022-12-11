package main

func main() {}

//export hello
func hello() *byte {
	return &(([]byte)("hello world")[0])
}

/*
- string => an array of bytes
- get the pos of 1st byte of the array
- return a pointer of the byte
*/
