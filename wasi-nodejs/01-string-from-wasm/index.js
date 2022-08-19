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

  // get the position (in memory) of the pointer
  const helloStringPosition = instance.exports.hello()

  // read the allocated memory (the memory of the wasm module)
  const memory = instance.exports.memory

  /*
    1- You cannot directly manipulate the contents of an ArrayBuffer
    2- You need to create a new one (a typed array of object) to read the content
  */
 
  const extractedBuffer = new Uint8Array(memory.buffer, helloStringPosition, 11)
  // 11 == length of "hello world"

  extractedBuffer.forEach(item => console.log(item,":",String.fromCharCode(item)))

  const str = new TextDecoder("utf8").decode(extractedBuffer)
  console.log(`📝 decoded string: ${str}`)

})();
