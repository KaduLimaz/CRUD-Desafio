import { useState, useEffect } from "react";
import { api } from "../services/api";
import moment from "moment";
import { FiEdit, FiTrash } from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import { LuFileSearch } from "react-icons/lu";

interface TaskProps {
	id: string;
	name: string;
	task: string;
	status: boolean;
	created_at: string;
	update_at: Date;
}

//exibir e gerenciar a lista de tarefas
export default function TaskEdit() {
	const [Tasks, setTasks] = useState<TaskProps[]>([]);
	const [csrfToken, setCsrfToken] = useState<string>();
	const navigate = useNavigate();

	//Obtém o token CSRF ao montar o componente.
	useEffect(() => {
		console.log("chamou");

		if (!csrfToken) getToken();
	}, []);

	// Carrega as tarefas quando o token CSRF é obtido.

	useEffect(() => {
		if (csrfToken) {
			loadTasks();
		}
	}, [csrfToken]);

	// Carrega as tarefas ao montar o componente.

	useEffect(() => {
		loadTasks();
	}, []);

	//Obtém um token CSRF do servidor.
	async function getToken() {
		const response = await api.get("/token", { withCredentials: true });

		console.log(response);

		setCsrfToken(response.data.token);
	}

	// Carrega as tarefas do servidor.

	async function loadTasks() {
		const response = await api.get("/list", {
			headers: { "csrf-token": csrfToken },
			withCredentials: true,
		});
		setTasks(response.data);
		console.log(response.data);
	}
	//Formata uma data para exibição.

	function formatDate(date: Date) {
		return moment(date).format("DD/MM/YYYY");
	}

	//Navega para a página de cadastro de nova tarefa.

	function newTask() {
		navigate("/task_cadastro");
	}

	/**
	 * Navega para a página de edição de uma tarefa.
	 * @param id ID da tarefa a ser editada.
	 */

	function editTask(id: string) {
		navigate(`/task_cadastro/${id}`);
	}

	/**
	 * Navega para a página de visualização de uma tarefa.
	 * @param id ID da tarefa a ser visualizada.
	 */

	function viewTask(id: string) {
		navigate(`/task/${id}`);
	}

	/**
	 * Manipula a exclusão de uma tarefa.
	 * @param id ID da tarefa a ser excluída.
	 */

	async function handleDelete(id: string) {
		await api.delete("/customer", {
			params: {
				id: id,
			},
			headers: { "csrf-token": csrfToken },
			withCredentials: true,
		});

		const allCustomers = Tasks.filter((customer) => {
			return customer.id !== id;
		});

		setTasks(allCustomers);
	}

	return (
		<>
			<div className="container mx-auto">
				<div className="w-full text-sm text-end">
					<button
						onClick={newTask}
						type="button"
						className="text-white bg-gray-600 border border-gray-300 focus:outline-none hover:bg-gray-900 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
					>
						Nova tarefa
					</button>
				</div>

				<div className="relative overflow-x-auto  sm:rounded-lg flex justify-center ">
					<table className="w-1/2 text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100  ">
						<thead className="text-xs text-white uppercase bg-blue-600 border-b border-blue-400 dark:text-white">
							<tr>
								<th scope="col" className="px-6 py-3 bg-blue-500">
									Titulo
								</th>
								<th scope="col" className="px-6 py-3">
									Data de Atualização
								</th>
								<th scope="col" className="px-6 py-3 bg-blue-500">
									Status
								</th>
							</tr>
						</thead>
						<tbody>
							{Tasks.map((task) => (
								<tr
									key={task.id}
									className="bg-blue-600 border-b border-blue-400 hover:bg-blue-500"
								>
									<td className="px-6 py-4">{task.name}</td>
									<td className="px-6 py-4">{formatDate(task.update_at)}</td>

									<td className="px-6 py-4 flex gap-2">
										<button
											name="delete"
											className="bg-red-500 w-6 h-6 flex items-center justify-center rounded "
											onClick={() => {
												handleDelete(task.id);
											}}
										>
											<FiTrash size={18} color="#fff" />
										</button>

										<button
											name="edit"
											className="bg-orange-300 w-6 h-6 flex items-center justify-center rounded"
											onClick={() => editTask(task.id)}
										>
											<FiEdit size={18} color="#fff" />
										</button>
										<button
											name="view"
											className=" bg-green-500 w-6 h-6 flex items-center justify-center rounded"
											onClick={() => viewTask(task.id)}
										>
											<LuFileSearch size={18} color="#fff" />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
