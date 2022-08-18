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

  let helloStringPosition = instance.exports.hello()
  let heyStringPosition = instance.exports.hey()

  console.log("🖐 position of the hello string pointer ([]byte)", helloStringPosition)
  console.log("🖐 position of the hey string pointer ([]byte)", heyStringPosition)
  let memory = instance.exports.memory

  //console.log("🤖 memory.buffer:", memory.buffer)
  /*
    memory.buffer is an ArrayBuffer
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer

    It is an array of bytes, often referred to in other languages as a "byte array". You cannot directly manipulate the contents of an ArrayBuffer; instead, you create one of the typed array objects or a DataView object which represents the buffer in a specific format, and use that to read and write the contents of the buffer.

  */
  const completeBufferFromMemory = new Uint8Array(memory.buffer)

console.log("--- hello ---------------------------")
completeBufferFromMemory.slice(helloStringPosition, helloStringPosition+11+5).forEach((item, index) => console.log(helloStringPosition+index,"->", item,":",String.fromCharCode(item)))
console.log("--- hey -----------------------------")
completeBufferFromMemory.slice(heyStringPosition, heyStringPosition+10+5).forEach((item, index) => console.log(heyStringPosition+index,"->",item,":",String.fromCharCode(item)))

// Hello
const extractedBuffer = new Uint8Array(memory.buffer, helloStringPosition);

console.log("😁 Uint8Array buffer:", extractedBuffer)
console.log("🎉 Pos of 1st 0:", extractedBuffer.indexOf(0))

const str = new TextDecoder("utf8").decode(extractedBuffer.slice(0, extractedBuffer.indexOf(0)))
console.log(`📝: ${str}`)



})();

// $ node --experimental-wasi-unstable-preview1 index.js
