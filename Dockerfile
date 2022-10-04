#!/bin/sh
FROM node:16.8.0-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

RUN npm install

# If you are building your code for production
#RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 80:80
CMD [ "node", "build/index.js","PRODUCTION"]