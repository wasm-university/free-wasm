#!/bin/bash

########################
# include the magic
########################
. ../demo-magic.sh

# hide the evidence
clear

# Put your stuff here
pei "SAT_HTTP_PORT=8088 sat ./as-hello-service/as-hello-service.wasm;"

echo "🌍 run javascript service in a splitted terminal"
