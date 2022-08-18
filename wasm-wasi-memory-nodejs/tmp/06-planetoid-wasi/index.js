
"use strict";
const fs = require("fs");
const { WASI } = require("wasi");
const wasi = new WASI();
const importObject = { wasi_snapshot_preview1: wasi.wasiImport };

const http = require('http');
const port = process.env.PLANETOID_HTTP_PORT || 8080

//console.log(wasi.wasiImport)
console.log(importObject)


//old
function getMemoryAddressFor(text, moduleInstance) {

  // Get the address of the writable memory.
  let addr = moduleInstance.exports.getBuffer()
  let buffer = moduleInstance.exports.memory.buffer

  let mem = new Uint8Array(buffer)
  let view = mem.subarray(addr, addr + text.length)

  for (let i = 0; i < text.length; i++) {
     view[i] = text.charCodeAt(i)
  }

  // Return the address we started at.
  return addr
}
// see: https://radu-matei.com/blog/practical-guide-to-wasm-memory/#exchanging-strings-between-modules-and-runtimes

/*

*/
// does not run correctly
function copyMemory(text, moduleInstance) {
  // the `alloc` function returns an offset in
  // the module's memory to the start of the block
  var ptr = moduleInstance.exports.getBuffer();
  // create a typed `ArrayBuffer` at `ptr` of proper size
  var mem = new Uint8Array(moduleInstance.exports.memory.buffer, ptr, text.length);
  // copy the content of `data` into the memory buffer
  mem.set(new Uint8Array(text));
  // return the pointer
  return ptr;
}



// Liberer la mémoire


(async () => {
  const wasm = await WebAssembly.compile(
    fs.readFileSync("./function/hello.wasm")
  );
  const moduleInstance = await WebAssembly.instantiate(wasm, importObject);

  wasi.start(moduleInstance);



  const requestHandler = (request, response) => {
    response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})

    let body = ''
    request.on('data', chunk => {
      body += chunk.toString() // convert Buffer to string
    })
    request.on('end', () => {
      //console.log("body", body)
      //TODO: handle exceptions

      // call the function
      // copy memory allow to pass data to the wasm module
      let memory = moduleInstance.exports.memory //🤔

      let handleValue = moduleInstance.exports.Handle(getMemoryAddressFor(body, moduleInstance), body.length)



      const buffer = new Uint8Array(memory.buffer, handleValue, 100)
      //const buffer = new Uint8Array(memory.buffer, handleValue)
      const str = new TextDecoder("utf8").decode(buffer)


      response.end(JSON.stringify(str.split("\u0000")[0]))
    })

  }

  const server = http.createServer(requestHandler)

  server.listen(port, (err) => {
    if (err) {
      return console.log('😡 something bad happened', err)
    }
    console.log(`🌍 serving on ${port}`)
  })



})();

// $ node --experimental-wasi-unstable-preview1 index.js

