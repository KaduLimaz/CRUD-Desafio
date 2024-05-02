import { useEffect, useState } from "react";
import { Crud } from "./Components/Crud";
import { api } from "./services/api";

interface CustomerProps {
	id: string;
	name: string;
	task: string;
	status: boolean;
	created_at: string;
}

export function App() {
	

	return <Crud />;
}
