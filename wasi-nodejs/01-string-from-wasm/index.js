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

  const helloStringPosition = instance.exports.hello()

  console.log("position of the pointer", helloStringPosition)

  const memory = instance.exports.memory

  //console.log("🤖 memory.buffer:", memory.buffer)
  /*
    memory.buffer is an ArrayBuffer
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer

    It is an array of bytes, often referred to in other languages as a "byte array". You cannot directly manipulate the contents of an ArrayBuffer; instead, you create one of the typed array objects or a DataView object which represents the buffer in a specific format, and use that to read and write the contents of the buffer.

  */
  //const completeBufferFromMemory = new Uint8Array(memory.buffer)

  //console.log("extract --->", completeBufferFromMemory.slice(helloStringPosition, helloStringPosition+11))

  //completeBufferFromMemory.slice(helloStringPosition, helloStringPosition+11).forEach(item => console.log(item,":",String.fromCharCode(item)))


  const extractedBuffer = new Uint8Array(memory.buffer, helloStringPosition, 11) // 11 == length of "hello world"

  console.log(extractedBuffer)

  extractedBuffer.forEach(item => console.log(item,":",String.fromCharCode(item)))

  const str = new TextDecoder("utf8").decode(extractedBuffer)
  console.log(`📝: ${str}`)

})();

// $ node --experimental-wasi-unstable-preview1 index.js
