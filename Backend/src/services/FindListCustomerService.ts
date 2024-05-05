import prismaClient from "../prisma";

export class FindListCustomerService {
	async execute(id) {
		const customer = await prismaClient.customer.findUnique({
			where: {
				id: id,
			},
		});

		return customer;
	}
}
