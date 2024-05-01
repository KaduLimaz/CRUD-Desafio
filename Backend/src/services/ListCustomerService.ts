import prismaClient from "../prisma";

// buscar os dados do banco
export class ListCustomerService {
	async execute() {
		const customers = await prismaClient.customer.findMany();

		return customers;
	}
}
