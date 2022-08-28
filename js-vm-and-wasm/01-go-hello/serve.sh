#!/bin/bash
pkill -f little-server
bash -c "exec -a little-server node server.js"


