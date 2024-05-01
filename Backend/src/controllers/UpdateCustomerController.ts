import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateCustomerService } from "../services/UpdateCustomerService";

export class UpdateCustomerController {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const { id, task } = request.body as { id: string; task: string };

		const customerServise = new UpdateCustomerService();
		const updateCustomer = await customerServise.execute({ id, task });

		reply.send(updateCustomer);
	}
}
