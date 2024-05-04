import fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes";
import fastifyCsrf from "@fastify/csrf-protection";
import fastifyCookie from "@fastify/cookie";

const app = fastify({ logger: true });

app.setErrorHandler((error, request, reply) => {
	reply.code(400).send({ error: error.message });
});

const start = async () => {
	await app.register(cors, {
		origin: "http://localhost:5173",
		methods: ["POST", "GET", "DELETE", "PUT"],
		credentials: true,
	});
	await app.register(routes);
	await app.register(fastifyCookie);
	await app.register(fastifyCsrf, {
		getToken: (request) => request.headers["csrf-token"],
	});

	try {
		await app.listen({ port: 3333 });
	} catch (error) {
		process.exit(1);
	}
};

start();
