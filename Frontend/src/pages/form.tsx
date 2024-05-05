import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import { api } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

interface TaskProps {
	id?: string;
	title?: string;
	description?: string;
	status?: boolean;
	created_at?: string;
	update_at?: Date;
}
export default function FormCadastro() {
	const [model, setModel] = useState<TaskProps[]>([]);
	const [csrfToken, setCsrfToken] = useState<string>();
	const nameRef = useRef<HTMLInputElement | null>(null);
	const taskRef = useRef<HTMLTextAreaElement | null>(null);
	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		console.log(id);
	}, [id]);

	function updateModel(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		setModel({
			...model,
			[event.target.name]: event.target.value,
		});
	}

	//token
	useEffect(() => {
		if (!csrfToken) getToken();
	}, []);

	useEffect(() => {
		if (csrfToken) {
			loadTasks();
		}
	}, [csrfToken]);

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
		setModel(response.data);
		console.log(response.data);
	}

	async function handleSumibit(event: FormEvent) {
		event.preventDefault();

		if (!nameRef.current?.value || !taskRef.current?.value) return;

		const response = await api.post(
			"/customer",
			{
				name: nameRef.current?.value,
				task: taskRef.current?.value,
			},
			{
				headers: { "csrf-token": csrfToken },
				withCredentials: true,
			}
		);
		console.log(response);
		nameRef.current?.value;
	}

	
	function backPage() {
		navigate("/task");
	}
	// async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
	// 	event.preventDefault();

	// 	const response = await api.post("/customer", model, {
	// 		headers: { "csrf-token": csrfToken },
	// 		withCredentials: true,
	// 	});

	// 	setModel((currentValue) => [...currentValue, response.data]);

	// 	// if (!nameRef.current?.value || !taskRef.current?.value) return;

	// 	// const response = await api.post(
	// 	// 	"/customer",
	// 	// 	{
	// 	// 		name: nameRef.current?.value,
	// 	// 		task: taskRef.current?.value,
	// 	// 	},
	// 	// 	{
	// 	// 		headers: { "csrf-token": csrfToken },
	// 	// 		withCredentials: true,
	// 	// 	}
	// 	// );

	// 	console.log(response);
	// }

	return (
		<>
			<div className="w-full text-sm text-end">
				<button
					onClick={backPage}
					type="button"
					className="text-white bg-gray-600 border border-gray-300 focus:outline-none hover:bg-gray-900 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
				>
					Voltar
				</button>
			</div>
			<div className="w-full min-h-screen bg-blue-600 flex justify-center px-4">
				<main className="my-10 w-full md:max-w-2xl">
					<div className="flex justify-center  text-white">
						<h1 className="text-4xl ">Cadastro Tarefa</h1>
					</div>
					<form onSubmit={handleSumibit} className="flex flex-col my-6">
						<label className="font-medium text-white">Titulo:</label>
						<input
							onChange={(event: ChangeEvent<HTMLInputElement>) => {
								updateModel(event);
							}}
							name="title"
							type="text"
							placeholder="Digite o nome"
							className="w-full mb-5 p-2 rounded-md"
							ref={nameRef}
						/>
						<label className="font-medium text-white">Descrição:</label>
						<textarea
							name="description"
							onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
								updateModel(event);
							}}
							rows={4}
							className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 gap-3"
							placeholder="Digite a tarefa"
							ref={taskRef}
						></textarea>
						<div className="flex items-center justify-center rounded-3 mt-4 ">
							<button
								type="submit"
								className=" rounded-lg inline-block bg-neutral-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-600 shadow-light-3 transition duration-150 ease-in-out hover:bg-neutral-200 hover:shadow-light-2 focus:bg-neutral-200 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
							>
								Salvar
							</button>
						</div>
					</form>
				</main>
			</div>
		</>
	);
}
