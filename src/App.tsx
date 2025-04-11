import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Language from "./pages/Test/Language/Language";

function App() {
	// const [count, setCount] = useState(0);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<div>About</div>} />
				<Route path="/test/language" element={<Language />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
