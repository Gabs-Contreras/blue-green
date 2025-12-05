#!/bin/bash
set -e

NGINX_CONF="/etc/nginx/sites-available/app.conf"

if [ "$1" = "blue" ]; then
    TARGET_PORT=3100
elif [ "$1" = "green" ]; then
    TARGET_PORT=3101
else
    echo "Uso: ./switch.sh [blue|green]"
    exit 1
fi

echo "Cambiando tráfico a puerto $TARGET_PORT..."

# Reemplazar el puerto dentro del bloque upstream
sudo sed -i "/upstream app_upstream {/,/}/s/server 127.0.0.1:[0-9]*/server 127.0.0.1:$TARGET_PORT/" $NGINX_CONF

# Validar sintaxis de Nginx
sudo nginx -t || { echo "Error: Configuración Nginx inválida"; exit 1; }

# Recargar Nginx sin downtime
sudo systemctl reload nginx

echo "Tráfico cambiado correctamente a puerto $TARGET_PORT"