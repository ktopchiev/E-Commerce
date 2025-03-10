import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import { Badge, Box, IconButton, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import UserMenu from './common/UserMenu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAppSelector } from '../store/configureStore';

export default function BottomNav() {

    const { basket } = useAppSelector(state => state.basket);
    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);
    const navigate = useNavigate();

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 100, mt: 5 }} elevation={3}>
            <BottomNavigation>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <BottomNavigationAction
                        label="Home"
                        value="home"
                        icon={<HomeIcon />}
                        onClick={() => navigate("/")}
                    />
                    <IconButton component={Link} to={'/basket'} sx={{ color: 'action' }}>
                        <Badge badgeContent={itemCount} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                    <UserMenu />
                </Box>
            </BottomNavigation>
        </Paper >
    );
}