import { DarkModeOutlined, LightMode, ShoppingCartOutlined } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import UserMenu from "./common/UserMenu";
import ProductSearch from "../common/ProductSearch";
import { useScreenSize } from "../hooks/useScreenSize";

const midLinks = [
    { title: 'catalog', path: '/catalog' },
    { title: 'about', path: '/about' },
    { title: 'contact', path: '/contact' }
]

const navStyles = {
    color: 'inherit',
    typography: { xs: 'body2', md: 'h6' },
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
    const { basket } = useAppSelector(state => state.basket);
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);
    const location = useLocation();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const screenSize = useScreenSize();

    return (
        <AppBar position="static">
            <Toolbar sx={{ display: "flex", justifyContent: 'space-between' }}>

                <Box sx={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>

                    {/* HeaderNavMenu on xs view */}
                    <Box sx={{ display: { xs: 'flex' } }}>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
                                {midLinks.map(({ title, path }) => (
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

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography
                                component={NavLink}
                                to='/'
                                sx={navStyles}
                            >
                                {screenSize == "xs" ? "EC" : "E - Commerce"}
                            </Typography>
                            <IconButton size="large" onClick={handleDarkMode}>
                                {darkMode ?
                                    <LightMode aria-label="Turn on the light" />
                                    : <DarkModeOutlined aria-label="Turn off the light" sx={{ color: 'white' }} />
                                }
                            </IconButton>
                        </Box>
                    </Box>
                    {location.pathname.endsWith("catalog") &&
                        <Box sx={{ display: { md: 'none', justifySelf: 'flex-end' } }}>
                            <ProductSearch />
                        </Box>
                    }

                    {/*Header NavMenu on large screen */}
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

                    <Box sx={{ display: { xs: 'none', md: 'flex', alignItems: 'center' } }}>
                        <IconButton component={Link} to={'/basket'} sx={{ color: 'inherit' }}>
                            <Badge badgeContent={itemCount} color="error">
                                <ShoppingCartOutlined />
                            </Badge>
                        </IconButton>
                        <UserMenu />
                    </Box>
                </Box>

            </Toolbar>
        </AppBar >
    )

}

export default Header