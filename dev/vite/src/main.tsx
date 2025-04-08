import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./languages/config.ts";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Router.ts";

const rootElement = document.getElementById("root");

if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>,
	);
} else {
	throw new Error("Root element not found");
}
