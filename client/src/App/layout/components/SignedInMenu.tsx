import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../../../features/account/accountSlice';
import { removeBasket } from '../../../features/basket/basketSlice';

export default function SignedInMenu({ email }: any) {

    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
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
                {email}
            </Button>
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
                }}>
                    Logout
                </MenuItem>
            </Menu>
        </div>
    );
}