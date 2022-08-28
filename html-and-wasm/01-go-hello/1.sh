#!/bin/bash

########################
# include the magic
########################
. ../demo-magic.sh

# hide the evidence
clear

# Put your stuff here
pei "GOOS=js GOARCH=wasm go build -o main.wasm"
pei "ls -lh *.wasm"
echo "🚀 run http server 🌍"
pkill -f little-server
gp url 8080
pe "bash -c \"exec -a little-server node server.js\""
