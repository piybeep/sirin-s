FROM node:18-alpine AS dev
WORKDIR /app
COPY /*.json ./
RUN npm install
COPY ./src ./
EXPOSE ${API_PORT}
VOLUME ./src ./src 
CMD ["npm","run", "start:dev"]

