# OpenShips frontend (Docker)

## Building and running the image

```bash
docker build -t openships-frontend .
```

Now you can run the container with:

```bash
docker run -d --name openships-frontend -p 127.0.0.1:3000:3000 openships-frontend
```

To update an existing container, you can use:

```bash
docker stop openships-frontend
docker rm openships-frontend
docker build -t openships-frontend .
docker run -d --name openships-frontend -p 127.0.0.1:3000:3000 openships-frontend
```