#!/bin/bash

########################
# include the magic
########################
. ../demo-magic.sh

# hide the evidence
clear

# Put your stuff here
pei "subo build hello"
pei "SAT_HTTP_PORT=8080 sat ./hello/hello.wasm"

echo "🌍 query in a splitted terminal"
