#!/bin/bash
clang --target=wasm32-unknown-wasi --no-standard-libraries -Wl,--export-all -Wl,--no-entry -o main.wasm main.c

ls -lh *.wasm
