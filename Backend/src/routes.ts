import {
	FastifyInstance,
	FastifyPluginOptions,
	FastifyRequest,
	FastifyReply,
} from "fastify";
import cors from "@fastify/cors";
import { request } from "http";
import { CreateCustomerController } from "./controllers/CreateCustomerController";
import { ListCustomerController } from "./controllers/ListCustomerController";
import { DeleteCustomerController } from "./controllers/DeleteCustomerController";
import { UpdateCustomerController } from "./controllers/UpdateCustomerController";
import { FindListCustomerController } from "./controllers/FindListCustomerController";
import { log } from "console";

export async function routes(
	fastify: FastifyInstance,
	options: FastifyPluginOptions
) {
	//vai gerar o token
	fastify.get("/token", async (req, reply) => {
		reply.header("Access-Control-Allow-Origin", "http://localhost:8080");
		const token = await reply.generateCsrf();
		return { token };
	});

	fastify.route({
		method: "POST",
		url: "/Testtoken",
		onRequest: (request, reply, done) => {
			fastify.csrfProtection(request, reply, done);
		},
		handler: async (req, reply) => {
			return req.body;
		},
	});

	fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
		console.log(request.body);

		return {
			ok: true,
			body: "teste",
		};
	});

	fastify.route({
		method: "POST",
		url: "/customer",
		onRequest: (request, reply, done) => {
			fastify.csrfProtection(request, reply, done);
		},
		handler: async (request, reply) => {
			return new CreateCustomerController().handle(request, reply);
		},
	});

	fastify.route({
		method: "GET",
		url: "/list",
		// onRequest: (request, reply, done) => {
		// 	fastify.csrfProtection(request, reply, done);
		// },
		handler: async (request, reply) => {
			return new ListCustomerController().handle(request, reply);
		},
	});

	fastify.route({
		method: "DELETE",
		url: "/customer",
		onRequest: (request, reply, done) => {
			fastify.csrfProtection(request, reply, done);
		},
		handler: async (request, reply) => {
			return new DeleteCustomerController().handle(request, reply);
		},
	});

	fastify.route({
		method: "PUT",
		url: "/customer/:id",
		onRequest: (request, reply, done) => {
			fastify.csrfProtection(request, reply, done);
		},
		handler: async (request, reply) => {
			return new UpdateCustomerController().handle(request, reply);
		},
	});

	fastify.route({
		method: "GET",
		url: "/list/:id",
		onRequest: (request, reply, done) => {
			fastify.csrfProtection(request, reply, done);
		},
		handler: async (request, reply) => {
			return new FindListCustomerController().handle(request, reply);
		},
	});
}
