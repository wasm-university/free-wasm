"use strict";
const fs = require("fs");
const { WASI } = require("wasi");
const wasi = new WASI();
const importObject = { wasi_snapshot_preview1: wasi.wasiImport };

(async () => {
  const wasm = await WebAssembly.compile(
    fs.readFileSync("./hello.wasm")
  );
  const instance = await WebAssembly.instantiate(wasm, importObject);

  wasi.start(instance);

  // 🖐 Prepare parameters
  // string to array of bytes
  const stringParameter = "Bob Morane";
  const bytes = new TextEncoder("utf-8").encode(stringParameter);

  // copy the contents of the string into the module's memory
  // allocate memory
  const ptr = instance.exports.alloc(bytes.length);
  // create a typed `ArrayBuffer` at `ptr` of proper size
  const mem = new Uint8Array(
    instance.exports.memory.buffer,
    ptr,
    bytes.length);
  // copy the content of `bytes` into the memory buffer
  mem.set(new Uint8Array(bytes));

  // call the module's `hello` function
  // params: position and size
  let helloPointerSize = instance.exports.hello(
    ptr,
    bytes.length);

  let memory = instance.exports.memory
  const completeBufferFromMemory = new Uint8Array(memory.buffer)

  const MASK = (2n**32n)-1n
  let stringPtrPosition = Number(helloPointerSize >> BigInt(32))
  let stringSize = Number(helloPointerSize & MASK)

  const extractedBuffer = completeBufferFromMemory.slice(stringPtrPosition, stringPtrPosition+stringSize)

  const str = new TextDecoder("utf8").decode(extractedBuffer)
  console.log(`📝: ${str}`)

})();

// $ node --experimental-wasi-unstable-preview1 index.js
