package main



//Alloc(?)
//export getBuffer
func getBuffer() *byte {
  var buf [1024]byte
	return &buf[0]
}

func main() {

}


//export Handle
func Handle(parameter string) *byte {

  returnedValue := "👋 Hello :"+parameter

  return &(([]byte)(returnedValue)[0])
}

/*
curl -d "bob morane" -X POST  http://localhost:8080
curl -d "bob morane and bill ballantine" -X POST  http://localhost:8080
curl -d "Irma Vep" -X POST  http://localhost:8080
*/
