# Establecer la imagen base
FROM node:18

RUN mkdir /app

WORKDIR /app

COPY app/ .

# RUN npm install

EXPOSE 3000

# Definir el comando para ejecutar la aplicación
CMD [ "node", "app.js" ]