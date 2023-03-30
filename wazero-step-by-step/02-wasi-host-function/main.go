package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/tetratelabs/wazero"
	//"github.com/tetratelabs/wazero/api"
	"github.com/tetratelabs/wazero/imports/wasi_snapshot_preview1"
)

func main() {
	// Choose the context to use for function calls.
	ctx := context.Background()

	// Create a new WebAssembly Runtime.
	r := wazero.NewRuntime(ctx)
	defer r.Close(ctx) // This closes everything this Runtime created.

	// 👋 Add a Host Function
	// Instantiate a Go-defined module named "env"
	// that exports a function (host_log_uint32) from the host to the wasm module
	_, errEnv := r.NewHostModuleBuilder("env").
		NewFunctionBuilder().
		WithFunc(func(value uint32) {
			fmt.Println("🤖:", value)
		}).
		Export("hostLogUint32").
		Instantiate(ctx)

	if errEnv != nil {
		log.Panicln(errEnv)
	}

	_, err := wasi_snapshot_preview1.Instantiate(ctx, r)
	if err != nil {
		log.Panicln(err)
	}

	// Load then Instantiate a WebAssembly module
	helloWasm, err := os.ReadFile("./function/hello.wasm")
	if err != nil {
		log.Panicln(err)
	}

	mod, err := r.Instantiate(ctx, helloWasm)
	if err != nil {
		log.Panicln(err)
	}

	// Get references to WebAssembly function: "add"
	addWasmModuleFunction := mod.ExportedFunction("add")

	result, err := addWasmModuleFunction.Call(ctx, 20, 22)
	if err != nil {
		log.Panicln(err)
	}

	fmt.Println("result:", result[0])

}
