import { DarkModeOutlined, LightMode, ShoppingCartOutlined } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material"
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import SignedInMenu from "./components/SignedInMenu";

const midLinks = [
    { title: 'catalog', path: '/catalog' },
    { title: 'about', path: '/about' },
    { title: 'contact', path: '/contact' }
]

const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' }
]

const navStyles = {
    color: 'inherit',
    typography: 'h6',
    textDecoration: 'none',
    '&:hover': {
        color: 'text.disabled'
    },
    '&.active': {
        color: 'text.secondary'
    }
}

interface Props {
    darkMode: boolean;
    handleDarkMode: () => void;
}

function Header({ darkMode, handleDarkMode }: Props) {
    const { user } = useAppSelector(state => state.account);
    const { basket } = useAppSelector(state => state.basket);
    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <AppBar position="static">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                        variant="h6"
                        component={NavLink}
                        to='/'
                        sx={navStyles}
                    >
                        E-Commerce
                    </Typography>
                    <IconButton size="large" onClick={handleDarkMode}>
                        {darkMode ?
                            <LightMode aria-label="Turn on the light" />
                            : <DarkModeOutlined aria-label="Turn off the light" sx={{ color: 'white' }} />
                        }
                    </IconButton>
                </Box>

                <Box sx={{ display: 'flex' }}>
                    <List sx={{ display: 'flex' }}>
                        {midLinks.map(({ title, path }) =>
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navStyles}
                            >
                                {title.toUpperCase()}

                            </ListItem>
                        )}
                    </List>
                </Box>

                <Box sx={{ display: 'flex' }}>
                    <IconButton component={Link} to={'/basket'} sx={{ color: 'inherit' }}>
                        <Badge badgeContent={itemCount} color="error">
                            <ShoppingCartOutlined />
                        </Badge>
                    </IconButton>
                    <List sx={{ display: 'flex' }}>
                        {user ?
                            <SignedInMenu email={user?.email} /> :
                            rightLinks.map(({ title, path }) =>
                                <ListItem
                                    component={NavLink}
                                    to={path}
                                    key={path}
                                    sx={navStyles}
                                >
                                    {title.toUpperCase()}

                                </ListItem>
                            )
                        }
                    </List>
                </Box>

            </Toolbar>
        </AppBar >
    )

}

export default Header