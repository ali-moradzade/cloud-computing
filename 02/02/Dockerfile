# Specify a base image
FROM node:alpine

WORKDIR /usr/app

COPY ./package.json ./
RUN npm install

COPY ./ ./

# Expose port
EXPOSE 3000

# Set Redis host and port
ENV REDIS_HOST redis
ENV REDIS_PORT 6379

# Default command
CMD ["npm", "start"]
