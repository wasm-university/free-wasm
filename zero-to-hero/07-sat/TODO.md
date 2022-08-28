### Demo SAT as an http server

- 🚧 `subo create runnable as-hello-service --lang assemblyscript`
- 🚧 `subo create runnable js-hello-service --lang javascript`
- 📝 update source code of both services
- 📦 `subo build as-hello-service`
- 📦 `subo build js-hello-service`
- 🚀 `SAT_HTTP_PORT=8081 sat ./as-hello-service/as-hello-service.wasm`
- 🚀 `SAT_HTTP_PORT=8082 sat ./js-hello-service/js-hello-service.wasm`
- 👀 `hello/lib.gr`
- 📦 `subo build hello`
- 🚀 `SAT_HTTP_PORT=8080 sat ./hello/hello.wasm`
- 🌍 `curl -d "Bob Morane" http://localhost:8080; echo ""`
