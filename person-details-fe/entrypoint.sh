#!/bin/sh

# Inject environment variable into runtime
echo "window.VITE_BACKEND_URL='${VITE_BACKEND_URL}';" > /usr/share/nginx/html/env-config.js

# Start Nginx
nginx -g "daemon off;"
