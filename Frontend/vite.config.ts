import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: 8080,
		strictPort: true,
		host: "0.0.0.0",
		origin: "http://0.0.0.0:8080",
	},
});
