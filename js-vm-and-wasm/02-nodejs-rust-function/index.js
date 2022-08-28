
const wasm = require("./hello/pkg/hello")

console.log(
  wasm.hello({firstName:"Bob", lastName:"Morane"})
)

