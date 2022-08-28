#!/bin/bash

########################
# include the magic
########################
. ../../demo-magic.sh

# hide the evidence
clear

# Put your stuff here
pei "subo create runnable as-hello-service --lang assemblyscript"
pei "subo create runnable js-hello-service --lang javascript"

echo "📝 update source code of both services"
