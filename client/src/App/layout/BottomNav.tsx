import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import { Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserMenu from './common/UserMenu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAppSelector } from '../store/configureStore';

export default function BottomNav() {

    const navigate = useNavigate();
    const { user } = useAppSelector(state => state.account);

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 100 }} elevation={3}>
            <BottomNavigation sx={{ width: 'auto' }} >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <BottomNavigationAction
                        label="Home"
                        value="home"
                        icon={<HomeIcon />}
                        onClick={() => navigate("/")}
                    />
                    <BottomNavigationAction
                        label="Favorites"
                        value="favorites"
                        icon={<ShoppingCartIcon />}
                        onClick={() => navigate('/basket')}
                    />
                    <UserMenu user={user} />
                </Box>
            </BottomNavigation>
        </Paper >
    );
}