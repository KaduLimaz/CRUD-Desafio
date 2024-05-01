import { FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomerService } from "../services/CreateCustomerService";
import { log } from "console";

export class CreateCustomerController {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const { name, task } = request.body as { name: string; task: string };

		const customerService = new CreateCustomerService();
		const customer = await customerService.execute({ name, task });

		reply.send(customer);
	}
}
