import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "../../features/basket/basketSlice";

function App() {
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const buyerId = getCookie('buyerId');
		if (buyerId) {
			agent.Basket.get()
				.then(basket => dispatch(setBasket(basket)))
				.catch(err => console.log(err))
				.finally(() => setLoading(false));
		} else {
			setLoading(false);
		}
	}, [dispatch]);

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

	if (loading) return <LoadingComponent message="Initializing app..." />

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
