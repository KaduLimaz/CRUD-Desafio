import prismaClient from "../prisma";

interface CreateCustomerProps {
	name: string;
	task: string;
}

export class CreateCustomerService {
	async execute({ name, task }: CreateCustomerProps) {
		if (!name || !task) {
			throw new Error("Preencha todos os campos");
		}

		const customer = await prismaClient.customer.create({
			data: {
				name,
				task,
				status: true,
			},
		});

		return {
			customer,
			message: "Criado com sucesso",
		};
	}
}
