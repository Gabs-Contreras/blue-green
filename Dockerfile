FROM node:20-alpine

# Crear directorio de la app
WORKDIR /app

# Copiar package.json y package-lock.json si existe
COPY package*.json ./

# Instalar dependencias en modo producción
RUN npm install --production

# Copiar el código del backend
COPY . .

# Exponer el puerto en que corre tu API (modificaremos luego según necesites)
EXPOSE 3005

# Comando para producción
CMD ["node", "src/index.js"]
