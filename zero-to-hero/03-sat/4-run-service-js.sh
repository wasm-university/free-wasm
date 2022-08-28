#!/bin/bash

########################
# include the magic
########################
. ../../demo-magic.sh

# hide the evidence
clear

# Put your stuff here
pei "SAT_HTTP_PORT=8089 sat ./js-hello-service/js-hello-service.wasm;"

echo "🚀 build & run hello in another terminal"
