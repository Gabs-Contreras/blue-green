#!/bin/bash
set -e

NGINX_CONF="/etc/nginx/sites-available/app.conf"

echo "=== Rollback: regresando tráfico a BLUE (3100) ==="

# Crear respaldo antes de modificar
sudo cp $NGINX_CONF $NGINX_CONF.bak

# Forzar upstream al puerto Blue (3100)
sudo sed -i "/upstream app_upstream {/,/}/s/server 127.0.0.1:[0-9]*/server 127.0.0.1:3100/" $NGINX_CONF

# Validar sintaxis de Nginx
if ! sudo nginx -t; then
    echo "Error en configuración de Nginx"
    exit 1
fi

# Recargar sin downtime
sudo systemctl reload nginx

echo " Rollback completado. Upstream actual:"
grep "server 127.0.0.1" $NGINX_CONF | grep -v "^#" | head -1