# Sat demo

```bash
subo create runnable as-hello-service --lang assemblyscript
subo build as-hello-service

SAT_HTTP_PORT=8081 sat ./as-hello-service/as-hello-service.wasm

# "👋 Hello World 🌍 From AssemblyScript"

subo create runnable js-hello-service --lang javascript
subo build js-hello-service

SAT_HTTP_PORT=8082 sat ./js-hello-service/js-hello-service.wasm

# "👋 Hello World 🌍 from JavaScript 😍"

subo create runnable hello --lang grain
subo build hello

SAT_HTTP_PORT=8080 sat ./hello/hello.wasm

curl -d "Bob Morane" http://localhost:8080; echo ""

# 👀 at the grain terminal
```

## Wapm.io (Wasmer)
Wasm registry

`SAT_HTTP_PORT=8080 sat https://registry-cdn.wapm.io/contents/k33g/forty-two/1.0.0/forty-two.wasm`

https://www.wasm.builders/k33g_org/publish-your-runnables-on-wapmio-49k0

## Fly.io
Caas | Déploiement ultra simple

https://www.wasm.builders/k33g_org/deploy-a-sat-serverless-function-with-to-flyio-35df
