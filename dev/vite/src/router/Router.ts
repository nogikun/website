import Language from "@/pages/Test/Language/Language";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";

export const router = createBrowserRouter([
	{
		path: "/",
		Component: Home,
	},

	{
		path: "/test/language",
		Component: Language,
	},
]);
