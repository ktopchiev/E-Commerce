import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../../../features/account/accountSlice';
import { removeBasket } from '../../../features/basket/basketSlice';
import PersonIcon from '@mui/icons-material/Person';
import { NavLink } from 'react-router-dom';
import { useScreenSize } from '../../hooks/useScreenSize';
import { useAppSelector } from '../../store/configureStore';
import { Divider } from '@mui/material';

export default function UserMenu() {

    const dispatch = useDispatch();
    const { user } = useAppSelector(state => state.account);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);


    const rightLinks = [
        { title: 'Login', path: '/login' },
        { title: 'Register', path: '/register' }
    ]

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

    const screenSize = useScreenSize();
    const userMenuIconColor = screenSize === "xs" && user ? 'primary' : 'action';

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                color='inherit'
                onClick={handleClick}
                sx={{ typography: 'h6' }}
            >
                <PersonIcon color={userMenuIconColor}></PersonIcon>
            </Button>
            {!user ?
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {
                        rightLinks.map(({ title, path }) =>
                            <MenuItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navStyles}
                                onClick={handleClose}
                            >
                                {title}

                            </MenuItem>

                        )
                    }
                </Menu>
                :
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem disabled={true}>{user.email}</MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My orders</MenuItem>
                    <MenuItem onClick={() => {
                        dispatch(signOut());
                        dispatch(removeBasket());
                        handleClose;
                    }}>
                        Logout
                    </MenuItem>
                </Menu>
            }
        </div>
    );
}