import { Container, createTheme, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import Header from "./Header";
import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LoadingComponent from "./common/LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { fetchBasketAsync } from "../../features/basket/basketSlice";
import { setCurrentUser } from "../../features/account/accountSlice";
import HomePage from "../../features/home/HomePage";
import BottomNav from "./BottomNav";

function App() {
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(true);
	const location = useLocation();

	const initApp = useCallback(async () => {
		try {
			await dispatch(setCurrentUser());
			await dispatch(fetchBasketAsync());
		} catch (error) {
			console.log(error);
		}
	}, [dispatch])

	useEffect(() => {
		initApp().then(() => setLoading(false));
	}, [initApp]);

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

	const isMobile = useMediaQuery("(max-width: 670px)");

	function handleDarkMode() {
		setDarkMode(!darkMode);
	}

	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<ToastContainer position="bottom-right" hideProgressBar theme="colored" />
				<CssBaseline />
				<Header darkMode={darkMode} handleDarkMode={handleDarkMode} />
				{isMobile &&
					<BottomNav></BottomNav>
				}
				{loading ?
					<LoadingComponent message="Initializing app..." />
					: location.pathname === '/' ? <HomePage />
						: <Container sx={{ mt: 4 }}>
							<Outlet />
						</Container>
				}
			</ThemeProvider>
		</div>
	)
}

export default App
