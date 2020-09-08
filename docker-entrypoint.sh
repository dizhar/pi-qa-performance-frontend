#!/bin/bash
set -e

echo "Starting pi-qa-performance-app fronend ..."

export BACKEND_IP=${HOST_IP}
export BACKEND_PORT=${BACKEND_PORT:-"3000"}

echo "HOST_IP       : ${HOST_IP}"
echo "BACKEND_IP    : ${BACKEND_IP}"
echo "BACKEND_PORT  : ${BACKEND_PORT}"

# envsubst < "/usr/share/nginx/html/assets/json/runtime.json" > "/usr/share/nginx/html/assets/json/runtime.json"
envsubst '${BACKEND_IP},${BACKEND_PORT}' <"/usr/share/nginx/html/assets/json/runtime.json"

nginx -g 'daemon off;'