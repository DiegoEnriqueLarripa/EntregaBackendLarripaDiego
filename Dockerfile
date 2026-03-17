# Usamos una imagen de Node.js ligera basada en Alpine (Linux reducido para mayor seguridad y velocidad)
FROM node:22-alpine

# Definimos el directorio de trabajo donde vivirá la app dentro del contenedor
WORKDIR /usr/src/app

# Copiamos los archivos de dependencias para instalar librerías
# Usamos comodín (*) para incluir package.json y package-lock.json
COPY package*.json ./

# Instalamos solo las dependencias de producción (omite devDependencies como mocha/supertest)
RUN npm install --only=production

# Copiamos el resto de los archivos del proyecto (código fuente, public, etc.)
COPY . .

# Exponemos el puerto en el que la aplicación escucha
EXPOSE 8080

# Definimos el comando de inicio de la aplicación
CMD [ "node", "src/app.js" ]