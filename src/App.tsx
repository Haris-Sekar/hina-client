import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import { apiAbortController } from "./api/axios.ts";
import 'material-symbols';

function App() {
	useEffect(() => {
		if (apiAbortController) apiAbortController.abort();
		document.title = "Hina Invoice"
	}, []);

	return (
		<AuthProvider>
			<Router
				future={{
					v7_relativeSplatPath: true,
					v7_startTransition: true,
				}}
			>
				<AppRoutes />
			</Router>
		</AuthProvider>
	);
}

export default App;
