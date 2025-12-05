#!/bin/bash
set -e

ENVIRONMENT=$1

if [ "$ENVIRONMENT" == "blue" ]; then
    PORT=3100
    CONTAINER_NAME="arroyo-blue"
elif [ "$ENVIRONMENT" == "green" ]; then
    PORT=3101
    CONTAINER_NAME="arroyo-green"
else
    echo "Uso: ./deploy.sh [blue|green]"
    exit 1
fi

echo "Desplegando backend en $ENVIRONMENT (puerto $PORT)..."

# Detener contenedor viejo (si existe)
docker stop $CONTAINER_NAME 2>/dev/null || true
docker rm $CONTAINER_NAME 2>/dev/null || true

# Construir imagen
docker build -t arroyo-back:latest .

# Ejecutar contenedor
docker run -d \
    --name $CONTAINER_NAME \
    -p $PORT:3000 \
    --env-file .env \
    --restart unless-stopped \
    arroyo-back:latest

echo "Despliegue en $ENVIRONMENT completado"
docker ps | grep $CONTAINER_NAME
