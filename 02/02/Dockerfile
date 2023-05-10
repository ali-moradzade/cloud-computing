# Specify a base image
FROM node:alpine

# Install redis
RUN apk add redis

# Install some dependencies
WORKDIR /usr/app
COPY ./package.json ./
RUN npm install

COPY ./ ./

# Expose port
EXPOSE 3000

# Default command
CMD sh -c 'redis-server & npm run start'