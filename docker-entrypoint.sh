#!/bin/bash
set -e

echo "Starting application..."
echo "HOST_IP = ${HOST_IP}"
envsubst < "/usr/share/nginx/html/assets/json/runtime.json" > "/usr/share/nginx/html/assets/json/runtime.json"
nginx -g 'daemon off;'