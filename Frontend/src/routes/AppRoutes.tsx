import { createBrowserRouter, RouterProvider } from "react-router-dom";

import TaskEdit from "../pages/TaskEdit";
import TaskForm from "../pages/TaskForm";
import ToView from "../pages/ToView";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <TaskEdit />,
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
