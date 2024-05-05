import { useState, useEffect } from "react";
import { api } from "../services/api";
import moment from "moment";
import { FiEdit, FiTrash } from "react-icons/fi";
import { MdDone } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface TaskProps {
	id: string;
	name: string;
	task: string;
	status: boolean;
	created_at: string;
	update_at: Date;
}
export default function TaskForm() {
	const [Tasks, setTasks] = useState<TaskProps[]>([]);
	const [csrfToken, setCsrfToken] = useState<string>();
	const navigate = useNavigate();

	//token
	useEffect(() => {
		console.log("chamou");

		if (!csrfToken) getToken();
	}, []);

	useEffect(() => {
		if (csrfToken) {
			loadTasks();
		}
	}, [csrfToken]);

	useEffect(() => {
		loadTasks();
	}, []);

	//pega o token
	async function getToken() {
		const response = await api.get("/token", { withCredentials: true });

		console.log(response);

		setCsrfToken(response.data.token);
	}

	async function loadTasks() {
		const response = await api.get("/list", {
			headers: { "csrf-token": csrfToken },
			withCredentials: true,
		});
		setTasks(response.data);
		console.log(response.data);
	}

	function formatDate(date: Date) {
		return moment(date).format("DD/MM/YYYY");
	}

	function newTask() {
		navigate("/task_cadastro");
	}

	return (
		<>
			<div className="w-full text-sm text-end">
				<button
					onClick={newTask}
					type="button"
					className="text-white bg-gray-600 border border-gray-300 focus:outline-none hover:bg-gray-900 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
				>
					Nova tarefa
				</button>
			</div>

			<div className="relative overflow-x-auto">
				<table className="w-full text-sm text-center left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								Titulo
							</th>
							<th scope="col" className="px-6 py-3">
								Data de Atualização
							</th>
							<th scope="col" className="px-6 py-3">
								Status
							</th>
							<th scope="col" className="px-6 py-3">
								Ações
							</th>
						</tr>
					</thead>
					<tbody>
						{Tasks.map((task) => (
							<tr
								key={task.id}
								className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
							>
								<td className="px-6 py-4">{task.name}</td>
								<td className="px-6 py-4">{formatDate(task.update_at)}</td>
								<td className="px-6 py-4">
									<span
										className={`${
											task.status
												? "bg-green-100 text-green-800"
												: "bg-orange-100 text-orange-800"
										} text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300`}
									>
										{task.status ? "Finalizado" : "Pendente"}
									</span>
								</td>
								<td className="px-6 py-4">{task.task}</td>
								<td className="px-6 py-4 flex gap-2">
									<button
										className="bg-red-500 w-6 h-6 flex items-center justify-center rounded "
										onClick={() => {}}
									>
										<FiTrash size={18} color="#fff" />
									</button>

									<button
										className="bg-green-500 w-6 h-6 flex items-center justify-center rounded "
										onClick={() => {}}
									>
										<MdDone size={18} color="#fff" />
									</button>

									<button
										className="bg-orange-300 w-6 h-6 flex items-center justify-center rounded"
										onClick={() => {}}
									>
										<FiEdit size={18} color="#fff" />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
