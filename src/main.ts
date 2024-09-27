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

	TODO: Remove the eval on buffer type validator. <--- TOP PRIORITY. THIS IS DANGEROUS. <-- Downgrade to 16.5.4 is the solution.
	TODO: Find a way to get the static url of the uploaded file.
	TODO: Remove single file upload function.
	TODO: Remove `create-kweek` decorator.
	TODO: Finish some routes.
        -> Kweek/Comments routes needs to be finished.
        -> Delete User service needs more protection.
	TODO: Create tests. <- Check NestJS documentation for that.
  TODO: Add `user` type to @nestjs/common ---> Request.
  TODO: Remove some useless information on `README`.
  TODO: Check if the Dockerfile is still working.
  TODO: Replace Prisma to Kysely or something more low-level.
  TODO: Replace Zod to Typebox. 

  --- Future ---

  TODO: Kubernetes.
  TODO: Send e-mails to the user when something happens to his account.
  TODO: Add a authorization system.
  TODO: Create a administrator dashboard showing statistics of the platform. <- Needs front-end first I guess... 
        -> Only users with moderation/administration permission will be able to access it.
           -> Users with moderation role can't access the statistics.
           -> They will need the permission of an administrator to delete kweeks and users.
        -> These users will be able to delete kweeks and terminate accounts with a obligatory reason.
        -> This reason will be send to the person by e-mail and he can contest this decision.
  TODO: Create a TOS.
  TODO: Create the chat system.
        -> Initialize the websocket system first.
  TODO: Check compatibility with Bun.
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
