import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import TaskEdit from "../pages/TaskEdit";
import TaskForm from "../pages/form";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/task",
		element: <TaskEdit />,
	},
	{
		path: "/task_cadastro",
		element: <TaskForm />,
	},
]);

export function AppRoutes() {
	return <RouterProvider router={router}></RouterProvider>;
}
