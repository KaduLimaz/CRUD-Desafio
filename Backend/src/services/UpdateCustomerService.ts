import prismaClient from "../prisma";

interface UpdateProps {
	id: string;
	task: string;
	name: string;
}

export class UpdateCustomerService {
	async execute({ id, task, name }: UpdateProps) {
		if (!id || !name) {
			throw new Error(
				"ID do cliente e tarefa são obrigatórios para atualização"
			);
		}

		const existingCustomer = await prismaClient.customer.findUnique({
			where: {
				id: id,
			},
		});

		if (!existingCustomer) {
			throw new Error("Não foi encontrado");
		}

		const updateCustomer = await prismaClient.customer.update({
			where: {
				id: id,
			},
			data: {
				task: task,
				name: name,
			},
		});
		return {
			name: updateCustomer.name,
			task: updateCustomer.task,
			message: "Tarefa atualizada com sucesso",
		};
	}
}
