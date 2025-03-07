import { alpha, debounce, styled, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { setProductParams } from "../../features/catalog/catalogSlice";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useLocation } from "react-router-dom";

export default function ProductSearch() {
    const { productParams } = useAppSelector(state => state.catalog);
    const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
    const page = useLocation();
    const dispatch = useAppDispatch();

    const debouncedSearch = debounce((event: any) => {
        dispatch(setProductParams({ searchTerm: event.target.value }))
    }, 1000)

    const Search = styled('div')(({ theme }) => ({
        display: page.pathname.includes("catalog") ? "block" : "none",
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledTextField = styled(TextField)(({ theme }) => ({
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'transparent'
            },
            '&:hover fieldset': {
                borderColor: 'transparent'
            },
            '&.Mui-focused fieldset': {
                borderColor: 'transparent'
            }
        }
    }));

    return (
        <>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledTextField
                    placeholder="Search products"
                    value={searchTerm || ''}
                    onChange={(event: any) => {
                        setSearchTerm(event.target.value);
                        debouncedSearch(event);
                    }}
                />
            </Search>
        </>
    )
}