# Specify a base image
FROM node:alpine

# Install redis
RUN apk add redis

# Run redis server
RUN redis-server &

# Install some dependencies
WORKDIR /usr/app
COPY ./package.json ./
RUN npm install

COPY ./ ./ 

# Default command
CMD ["npm", "start"]
