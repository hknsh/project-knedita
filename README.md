<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./resources/logo-light.svg">
    <source media="(prefers-color-scheme: light)" srcset="./resources/logo-dark.svg">
    <img alt="Project Knedita" src="./resources/logo-light.svg" width="700">
  </picture>
</p>

A simple RESTful API made with **NestJS** and **Fastify**.

### 🚀 Preparing the environment

Make sure that you have Bun, Docker and Docker Compose installed on your computer.

This project also works with Node and Npm.

First, install the necessary packages with the following commands:

```bash
bun i
```

After that, you can update the `.env` and the `docker.env` files. The `.env` file is for development environment and the `docker.env` is for production.

You can find the templates for those files on `.env.example` and `docker.env.example`.

To run the necessary services you can execute the following command:

```bash
bun docker:db
```

This will start the following services:

- **PostgreSQL**
- **Redis**
- **MinIO**

Apply the migrations to the database with the following command:

```bash
bun migrate:dev
```

And now, you can start the server with the command:

```bash
bun dev:start
```

You can check the documentation accessing the endpoint `/` in your browser

To run in production you can use the following command:

```bash
bun docker
```

This will start all the previous services and the back-end image.

## 🗄️ Stack

This back-end uses the following stack:

- **NestJS**
- **Fastify**
- **Prisma**
- **MinIO**
- **PostgreSQL**
- **Redis**
- **Swagger**
- **Typescript**

## License

[MIT](https://choosealicense.com/licenses/mit/)
