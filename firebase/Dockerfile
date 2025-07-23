FROM node:22-alpine

RUN apk add openjdk11 curl
RUN npm install -g firebase-tools

WORKDIR /app
COPY . .

EXPOSE 4000 4500 9099

ENTRYPOINT exec ./entrypoint.sh