FROM node:18-alpine AS dev
WORKDIR /app
<<<<<<< HEAD
COPY /*.json ./
RUN npm install
COPY ./src ./
EXPOSE ${API_PORT}
VOLUME ./src ./src 
CMD ["npm","run", "start:dev"]

=======
COPY *.json ./
RUN npm i -s 
COPY ./src ./
VOLUME ./src ./src
CMD [ "npm", "run", "start:dev" ]
>>>>>>> 8a8519e3852a64d34fbd40a021929b5881cae2b8
