import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { patchNestJsSwagger } from "nestjs-zod";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  patchNestJsSwagger();

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("Project Knedita")
    .setDescription("An open-source social media")
    .setVersion("1.0")
    .addTag("User")
    .addTag("Post")
    .addTag("Comment")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("/", app, document);

  await app.listen(3000);
}
bootstrap();
