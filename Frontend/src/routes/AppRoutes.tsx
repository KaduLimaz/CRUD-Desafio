import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import TaskEdit from "../pages/TaskEdit";
import TaskForm from "../pages/form";
import ToView from "../pages/ToView";

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
	{
		path: "/task_cadastro/:id",
		element: <TaskForm />,
	},
	{
		path: "/task/:id",
		element: <ToView />,
	},
]);

export function AppRoutes() {
	return <RouterProvider router={router}></RouterProvider>;
}
