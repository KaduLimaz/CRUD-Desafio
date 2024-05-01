import prismaClient from "../prisma";

interface DeleteProps {
	id: string;
}

export class DeleteCustomerService {
	async execute({ id }: DeleteProps) {
		if (!id) {
			throw new Error("Solicitação invalida");
		}

		const findId = await prismaClient.customer.findFirst({
			where: {
				id: id,
			},
		});

		if (!findId) {
			throw new Error("Não encontrado");
		}

		await prismaClient.customer.delete({
			where: {
				id: findId.id,
			},
		});

		return {
			message: "Deletado com sucesso!",
		};
	}
}
