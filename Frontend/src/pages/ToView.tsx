import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../services/api";
import moment from "moment";

interface viewTask {
	id: string;
	name: string;
	task: string;
	status: boolean;
	created_at: Date;
	update_at: Date;
}

export default function ToView() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [task, setTask] = useState<viewTask>();
	const [csrfToken, setCsrfToken] = useState<string>();

	//token
	useEffect(() => {
		if (!csrfToken) getToken();
	}, []);

	useEffect(() => {
		if (csrfToken) {
			findTask();
		}
	}, [csrfToken]);

	useEffect(() => {
		findTask();
	}, [id]);

	async function getToken() {
		const response = await api.get("/token", { withCredentials: true });

		console.log(response);

		setCsrfToken(response.data.token);
	}

	function backPage() {
		navigate("/task");
	}

	async function findTask() {
		const response = await api.get<viewTask>(`/list/${id}`, {
			headers: { "csrf-token": csrfToken },
			withCredentials: true,
		});

		setTask(response.data);
	}

	function formatDate(date: Date | undefined) {
		return moment(date).format("DD/MM/YYYY");
	}

	return (
		<>
			<div className="w-full text-sm text-end">
				<button
					onClick={() => {
						backPage();
					}}
					type="button"
					className="text-white bg-gray-600 border border-gray-300 focus:outline-none hover:bg-gray-900 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
				>
					Voltar
				</button>
			</div>
			<div className="flex justify-center">
				<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
					<a href="#">
						<h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
							{task?.name}
						</h1>
					</a>
					<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
						{task?.task}
					</p>
					<p className="text-2 font-medium text-gray-900 dark:text-white">
						Data de Cadastro:
						<span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
							{formatDate(task?.created_at)}
						</span>
					</p>
					<p className="text-2 font-medium text-gray-900 dark:text-white">
						Data de Atualização:
						<span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
							{formatDate(task?.update_at)}
						</span>
					</p>
				</div>
			</div>
		</>
	);
}
