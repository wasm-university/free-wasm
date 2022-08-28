# 01 Ignition

The `wasm_exec.js` file is a JavaScript file provided by the Go project to load your .wasm file into a Web page. This file allows interacting with your browser JavaScript API and the Wasm (Go) program.

`wasm_exec.js` is available with the Go installation. You need to copy it into the directory of your recipe with the following command:

```bash
cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" .
```
