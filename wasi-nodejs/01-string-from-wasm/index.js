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
  console.log("--------------------------------------")
  console.log("1️⃣ position of the pointer", helloStringPosition)
  console.log("--------------------------------------")

  // read the allocated memory (the memory of the wasm module)
  const memory = instance.exports.memory
  console.log("2️⃣ memory.buffer:", memory.buffer)
  console.log("--------------------------------------")

  /*
    1- You cannot directly manipulate the contents of an ArrayBuffer
    2- You need to create a new one (a typed array of object) to read the content
  */
  const extractedBuffer = new Uint8Array(memory.buffer, helloStringPosition, 11) // 11 == length of "hello world"
  /*
    3- But you need to know the length of the string
  */

  console.log("3️⃣ Extracted buffer:", extractedBuffer)

  console.log("--------------------------------------")
  extractedBuffer.forEach(item => console.log(item,":",String.fromCharCode(item)))
  console.log("--------------------------------------")

  const str = new TextDecoder("utf8").decode(extractedBuffer)
  console.log(`📝 decoded string: ${str}`)
  console.log("--------------------------------------")

})();
