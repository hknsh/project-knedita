import helmet from "@fastify/helmet";
import { NestFactory } from "@nestjs/core";
import {
	FastifyAdapter,
	NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { patchNestJsSwagger } from "nestjs-zod";
import { AppModule } from "./app.module";
import { Configuration } from "./configuration";

/*
  --- Present ---

	TODO: Finish some routes.
        -> Delete User service needs more protection.
  TODO: Add `user` type to @nestjs/common ---> Request.
  TODO: Add a authorization system.
  TODO: Send e-mails to the user when something happens to his account.
  TODO: Create the chat system.
        -> Initialize the websocket system first.
  TODO: Create a TOS.
  TODO: Improve Kysely Queries.
  TODO: Fix Docker Image.
*/

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

	await app.listen(Configuration.SERVER_PORT(), Configuration.SERVER_HOST);
}
bootstrap();
