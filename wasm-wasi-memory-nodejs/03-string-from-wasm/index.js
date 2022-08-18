"use strict";
const fs = require("fs");
const { WASI } = require("wasi");
const wasi = new WASI();
const importObject = { wasi_snapshot_preview1: wasi.wasiImport };

(async () => {
  const wasm = await WebAssembly.compile(
    fs.readFileSync("./function/hello.wasm")
  );
  const instance = await WebAssembly.instantiate(wasm, importObject);

  wasi.start(instance);

  // call hello
  // get a kind of pair of value
  const helloPointerSize = instance.exports.hello(); // ptrSize

  console.log(helloPointerSize, typeof helloPointerSize); // bigInt

  const memory = instance.exports.memory;

  const completeBufferFromMemory = new Uint8Array(memory.buffer);

  const MASK = (2n**32n)-1n

  // extract the values of the pair
  const stringPtrPosition = Number(helloPointerSize >> BigInt(32));
  const stringSize = Number(helloPointerSize & MASK);

  const extractedBuffer = completeBufferFromMemory.slice(stringPtrPosition, stringPtrPosition+stringSize)

  const str = new TextDecoder("utf8").decode(extractedBuffer)
  console.log(str)

})();

// $ node --experimental-wasi-unstable-preview1 index.js
