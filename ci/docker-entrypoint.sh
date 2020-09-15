#!/bin/bash
set -e

echo "Starting pi-qa-performance-app fronend ..."

export BACKEND_IP=${HOST_IP}
export BACKEND_PORT=${BACKEND_PORT:-"3000"}

echo "HOST_IP       : ${HOST_IP}"
echo "BACKEND_IP    : ${BACKEND_IP}"
echo "BACKEND_PORT  : ${BACKEND_PORT}"

echo ""
echo "Replacing values in runtime.json file ..."
config_file="/usr/share/nginx/html/assets/json/runtime.json"
tmp_file=$(mktemp)
cp -p $config_file $tmp_file
cat $config_file | envsubst | tee $tmp_file &&  mv $tmp_file $config_file

# envsubst < input.json > output.json
# envsubst < /usr/share/nginx/html/assets/json/runtime.json > /usr/share/nginx/html/assets/json/runtime.json
# envsubst '${BACKEND_IP},${BACKEND_PORT}' <"/usr/share/nginx/html/assets/json/runtime.json"
echo ""
cat /usr/share/nginx/html/assets/json/runtime.json
echo ""

echo "Starting nginx ..."

ls -l

echo "Run base image entrypoint.sh"
./entrypoint.sh

# nginx -g 'daemon off;'
