import { BrowserRouter as Router } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import { apiAbortController } from "./api/axios.ts"; 

function App() {
	useEffect(() => {
		if (apiAbortController) apiAbortController.abort();
	}, []);

	return (
		<Router
			future={{
				v7_relativeSplatPath: true,
				v7_startTransition: true,
			}}
		>
			<AppRoutes />
		</Router>
	);
}

export default App;
