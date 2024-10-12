import { Environment } from "./environment";

export namespace Configuration {
	export const NODE_ENV = () => Environment.env.NODE_ENV;
	export const SERVER_HOST = () => Environment.env.SERVER_HOST;
	export const SERVER_PORT = () => Environment.env.SERVER_PORT;
	export const JWT_ACCESS_SECRET = () => Environment.env.JWT_ACCESS_SECRET;
	export const REDIS_URL = () => Environment.env.REDIS_URL;
	export const MINIO_ROOT_USER = () => Environment.env.MINIO_ROOT_USER;
	export const MINIO_ROOT_PASSWORD = () => Environment.env.MINIO_ROOT_PASSWORD;
	export const MINIO_DEFAULT_BUCKETS = () =>
		Environment.env.MINIO_DEFAULT_BUCKETS;
	export const MINIO_ENDPOINT = () => Environment.env.MINIO_ENDPOINT;
}
