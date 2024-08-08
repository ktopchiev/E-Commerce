import Catalog from "../../features/catalog/Catalog";
import { Container, CssBaseline } from "@mui/material";
import Header from "./Header";

function App() {

	return (
		<div>
			<CssBaseline />
			<Header />
			<Container>
				<Catalog />
			</Container>
		</div>
	)
}

export default App
