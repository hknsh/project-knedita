import { UserModel } from "@/users/models/user.model";

declare module "fastify" {
	interface FastifyRequest {
		user: UserModel;
	}
}
