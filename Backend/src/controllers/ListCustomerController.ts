import { FastifyRequest, FastifyReply } from "fastify";
import { ListCustomerService } from "../services/ListCustomerService";

export class ListCustomerController {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const listCustomerService = new ListCustomerService();

		const customers = await listCustomerService.execute();

		reply.send(customers);
	}
}
