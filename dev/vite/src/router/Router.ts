import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import { Page } from "../stories/Page";

export const router = createBrowserRouter([
	{
		path: "/",
		Component: Home,
	},

	{
		path: "/page",
		Component: Page,
	},
]);
