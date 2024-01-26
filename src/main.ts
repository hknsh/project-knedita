import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { patchNestJsSwagger } from "nestjs-zod";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import * as helmet from "@fastify/helmet";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  patchNestJsSwagger();

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("Project Knedita")
    .setDescription("An open-source social media")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT Token",
        in: "header",
      },
      "JWT",
    )
    .addTag("Auth")
    .addTag("Kweeks")
    .addTag("Users")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("/", app, document);

  await app.register(helmet);

  await app.listen(3000, "0.0.0.0");
}
bootstrap();
