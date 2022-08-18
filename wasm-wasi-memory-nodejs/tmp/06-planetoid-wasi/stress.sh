#!/bin/bash
url_api="http://localhost:8080"
data='Bob'
hey -n 10000 -c 1000 -m POST -d ${data} "${url_api}" 
