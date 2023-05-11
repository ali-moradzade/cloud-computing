# Project

## Redis
```shell
docker run -d --name redis -v ./data:/data redis:alpine
```

## Node
```shell
npm run docker:build
```

It runs the following command: `docker build -t alimoradzade/my-node-redis-image .`

```shell
npm run docker:start
```

It runs the following command: `docker run -p 3000:3000 -v .:/usr/app -v node_modules --link redis:redis alimoradzade/my-node-redis-image`
