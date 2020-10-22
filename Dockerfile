#RESCATA IMAGEN DE NODE 
FROM node:12.14.1

#OBTIENE ACTUALIZACIONES E INSTALA JDK
RUN apt-get update && apt-get install default-jdk -y

#CONFIGURACION DE MEMORIA DE MAQUINA VIRTUAL
RUN echo "export_JAVA_OPTIONS='-Xmx2048m'" >> /etc/environment


CMD ["source", "/etc/environment"]


#CREA DIRECTORIO Y/O SE POSICIONS EN EL
WORKDIR /var/app

#COPIA TODO A DIRECTORIO DE APP
COPY . /var/app

#COPIA .env A DIRECTORIO DE APP
#COPY .env /var/app/.env

#INSTALACION DE PAQUETES NODE
RUN npm install


#CAMBIA PERMISOS DE EJECUCION AL ENTRYPOINT
RUN chmod +x entrypoint.sh

ENV MONGODB_URI=mongodb://alerti:clip2020@192.168.0.3:27017/wikidrive 
ENV PORT=8091
ENV SECRET=cl1pt3cn0l0g14


#Define the network ports that this container will listen on at runtime.
EXPOSE 8091

#Configure this container for running as an executable.
ENTRYPOINT [ "/var/app/entrypoint.sh" ]
#CMD ["./wait-for-it.sh" , "alerti-db:27017" , "--strict" , "--timeout=15000" , "--" , "npm start"]

