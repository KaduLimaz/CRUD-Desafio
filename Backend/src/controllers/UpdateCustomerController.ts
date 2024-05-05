import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateCustomerService } from "../services/UpdateCustomerService";

export class UpdateCustomerController {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { id } = request.params as { id: string };
			const { task } = request.body as { task: string };
			const { name } = request.body as { name: string };

			const customerService = new UpdateCustomerService();
			const updateCustomer = await customerService.execute({
				id,
				task,
				name,
			});

			reply.send(updateCustomer);
		} catch (error) {
			reply.status(500).send({
				error: "Erro ao atualizar cliente",
			});
		}
	}
}
