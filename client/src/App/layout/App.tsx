import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./Header";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {

	const [darkMode, setDarkMode] = useState(false);
	const paletteType = darkMode ? 'dark' : 'light';
	const theme = createTheme({
		palette: {
			mode: paletteType,
			background: {
				default: paletteType === 'light' ? '#eaeaea' : '#121212'
			}
		},
	});

	function handleDarkMode() {
		setDarkMode(!darkMode);
	}

	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<ToastContainer position="bottom-right" hideProgressBar theme="colored" />
				<CssBaseline />
				<Header darkMode={darkMode} handleDarkMode={handleDarkMode} />
				<Container>
					<Outlet />
				</Container>
			</ThemeProvider>
		</div>
	)
}

export default App
