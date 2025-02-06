import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../../../features/account/accountSlice';
import { removeBasket } from '../../../features/basket/basketSlice';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { NavLink } from 'react-router-dom';

export default function UserMenu({ user }: any) {

    const dispatch = useDispatch();

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
                <PersonOutlineIcon style={{ color: user ? 'white' : 'black' }}></PersonOutlineIcon>
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