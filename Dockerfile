FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

FROM node:20.11-alpine as main

WORKDIR /app

COPY --from=build /app /app

EXPOSE ${APP_PORT}

CMD npm run docker:setup