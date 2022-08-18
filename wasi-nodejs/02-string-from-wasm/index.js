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

  let helloStringPosition = instance.exports.hello()
  let heyStringPosition = instance.exports.hey()

  console.log("--------------------------------------")
  console.log("1️⃣ position of the hello string pointer ([]byte)", helloStringPosition)
  console.log("2️⃣ position of the hey string pointer ([]byte)", heyStringPosition)
  let memory = instance.exports.memory
  console.log("--------------------------------------")

  // You need the entire buffer

  var extractedBufferFromMemory = new Uint8Array(memory.buffer, helloStringPosition, heyStringPosition-helloStringPosition+10+5)

  extractedBufferFromMemory.
    forEach((item, index) => console.log(
      helloStringPosition+index,"->", item,":",String.fromCharCode(item)
    ))

  console.log("--------------------------------------")


})();

// $ node --experimental-wasi-unstable-preview1 index.js
