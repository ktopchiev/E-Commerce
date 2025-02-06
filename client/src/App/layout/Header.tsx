import { DarkModeOutlined, LightMode, ShoppingCartOutlined } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import SignedInMenu from "./components/SignedInMenu";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';

const midLinks = [
    { title: 'catalog', path: '/catalog' },
    { title: 'about', path: '/about' },
    { title: 'contact', path: '/contact' }
]

const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' }
]

const navMenuLinks = midLinks.concat(rightLinks);

const navStyles = {
    color: 'inherit',
    typography: { sm: 'subtitle1', md: 'h6' },
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
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
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

                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
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

                {/* NavMenu on xs view */}
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', justifyContent: 'flex-end' } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{ display: { xs: 'block', md: 'none' } }}
                    >
                        {navMenuLinks.map(({ title, path }) => (
                            <MenuItem
                                component={NavLink}
                                key={path}
                                to={path}
                                onClick={handleCloseNavMenu}>
                                <Typography sx={{ textAlign: 'center' }}>
                                    {title.toUpperCase()}
                                </Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>

                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
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