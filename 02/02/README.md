# Project

```shell
docker build -t alimoradzade/my-node-redis-image .
```

```shell
docker run -p 3000:3000 -v .:/usr/app -v node_modules -v data:/usr/app/data alimoradzade/my-node-redis-image
```
