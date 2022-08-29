package main

import (
	"fmt"
	"log"
	"os"

	"github.com/suborbital/sat/sat"
)

func main() {

	argsWithoutCaller := os.Args[1:]
	wasmModulePath := argsWithoutCaller[0]
	wasmModuleParameters := argsWithoutCaller[1:]

	wasmModuleConfig, _ := sat.ConfigFromRunnableArg(wasmModulePath) // 👋 first param: path to the wasm module

	satFunction, _ := sat.New(wasmModuleConfig, nil)

	result, err := satFunction.Exec([]byte(wasmModuleParameters[0])) // 👋 URL http://localhost:9090
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("🎉 " + string(result.Output))

}
