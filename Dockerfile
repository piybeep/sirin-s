FROM node:18.9.1-alpine as develop
WORKDIR /app
COPY *.json ./
RUN npm i -s 
COPY src ./
VOLUME src ./src
CMD [ "npm", "run", "start:dev" ]
