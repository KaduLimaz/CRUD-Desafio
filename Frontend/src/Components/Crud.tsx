import { FiTrash } from "react-icons/fi";
import { useEffect, useState } from "react";
import { api } from "../services/api";

interface CustomerProps {
	id: string;
	name: string;
	task: string;
	status: boolean;
	created_at: string;
}

export function Crud() {
	const [customers, setCustomers] = useState<CustomerProps[]>([]);

	useEffect(() => {
		loadCustomers();
	}, []);

	async function loadCustomers() {
		const response = await api.get("/list");
		setCustomers(response.data);
	}
	return (
		<>
			<div className="w-full min-h-screen bg-blue-600 flex justify-center px-4">
				<main className=" my-10 w-full md:max-w-2xl">
					<h1 className="text-4xl">Clientes</h1>

					<form className="flex flex-col my-6" action="">
						<label className="font-medium text-white">Nome:</label>
						<input
							type="text"
							placeholder="Digite o nome"
							className="w-full mb-5 p-2 rounded-md"
						/>
						<label className="font-medium text-white">Tarefa:</label>
						<textarea
							name="message"
							id=""
							className=" min-h-[100px] max-h-[300px] h-28 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter py-4 px-4 mb-5 p-2 rounded-md"
							placeholder="Digite a tarefa"
						></textarea>
						<input
							type="submit"
							value="Cadastrar"
							className="cursor-pointer w-full p-2 bg-blue-800 rounded-lg font-medium"
						/>
					</form>

					<section className="flex flex-col gap-4">
						{customers.map((customer) => (
							<article
								key={customer.id}
								className="w-6/12 bg-white rounded-lg p-2 relative hover:scale-105 duration-200"
							>
								<p>
									<span className="font-medium">Nome:</span>
									{customer.name}
								</p>
								<p>
									<span className="font-medium">Tarefa:</span> {customer.task}
								</p>
								<p>
									<span className="font-medium">Status:</span>{" "}
									{customer.status ? "Ativo" : " Inativo"}
								</p>

								<button className="bg-red-500 w-6 h-6 flex items-center justify-center rounded">
									<FiTrash size={18} color="#fff" />
								</button>
							</article>
						))}
					</section>
				</main>
			</div>
		</>
	);
}
