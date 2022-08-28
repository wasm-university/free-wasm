# Sat - First contact

## Build the CLI

```bash
go build -o demo
```

## Create a runnable skeleton

```bash
subo create runnable hello --lang rust
subo build hello/
```

```bash
./demo hello/hello.wasm "bob morane"

```

## Demo host function (fetch)

```bash
subo build ping/
node pong.js
./demo ping/ping.wasm http://localhost:9090
```
