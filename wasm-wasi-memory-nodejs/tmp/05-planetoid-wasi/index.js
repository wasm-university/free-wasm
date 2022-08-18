/*
à lire:
- https://www.alcarney.me/blog/2020/passing-strings-between-tinygo-wasm/
- https://radu-matei.com/blog/nodejs-wasi/
- https://radu-matei.com/blog/practical-guide-to-wasm-memory/#exchanging-strings-between-modules-and-runtimes

*/

"use strict";
const fs = require("fs");
const { WASI } = require("wasi");
const wasi = new WASI({
  args: ["arg1", "arg2"],
  env: {
    VERSION: "1.2.3",
    NAME: "PLANETOID",
  },
});
const importObject = { wasi_snapshot_preview1: wasi.wasiImport };

function getMemoryAddressFor(text, moduleInstance) {

  // Get the address of the writable memory.
  let addr = moduleInstance.exports.getBuffer()
  let buffer = moduleInstance.exports.memory.buffer

  let mem = new Int8Array(buffer)
  let view = mem.subarray(addr, addr + text.length)

  for (let i = 0; i < text.length; i++) {
     view[i] = text.charCodeAt(i)
  }

  // Return the address we started at.
  return addr
}

console.log(importObject);

(async () => {
  const wasm = await WebAssembly.compile(
    fs.readFileSync("./function/hello.wasm")
  );
  const moduleInstance = await WebAssembly.instantiate(wasm, importObject);

  wasi.start(moduleInstance);

  let helloValue = moduleInstance.exports.hello(getMemoryAddressFor("SAM", moduleInstance), "SAM".length)

  let memory = moduleInstance.exports.memory

  console.log(memory.buffer)

  let addr = getMemoryAddressFor("pouet pouet", moduleInstance)
  moduleInstance.exports.echo(addr, "pouet pouet".length)

  let msg = "tada"
  moduleInstance.exports.echo(getMemoryAddressFor(msg, moduleInstance), msg.length)



  const buffer = new Uint8Array(memory.buffer, helloValue, 50)
  const str = new TextDecoder("utf8").decode(buffer)
  console.log(`📝: ${str}`)

})();

// $ node --experimental-wasi-unstable-preview1 index.js

