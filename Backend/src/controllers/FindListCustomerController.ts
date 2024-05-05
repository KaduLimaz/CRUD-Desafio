import { FastifyRequest, FastifyReply } from "fastify";
import { FindListCustomerService } from "../services/FindListCustomerService";

export class FindListCustomerController {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const { id } = request.params as { id: string };
		const getCustomerByIdService = new FindListCustomerService();

		try {
			const customer = await getCustomerByIdService.execute(id);
			if (customer) {
				reply.send(customer);
			} else {
				reply.status(404).send({ error: "Cliente não encontrado" });
			}
		} catch (error) {
			reply.status(500).send({ error: "Erro ao buscar o cliente" });
		}
	}
}
