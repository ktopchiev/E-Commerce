import { debounce, InputAdornment, Paper, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../App/store/configureStore";
import { setProductParams } from "../../features/catalog/catalogSlice";
import { useState } from "react";
import { useScreenSize } from "../hooks/useScreenSize";
import SearchIcon from '@mui/icons-material/Search';

export default function ProductSearch() {
    const { productParams } = useAppSelector(state => state.catalog);
    const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
    const dispatch = useAppDispatch();

    const debouncedSearch = debounce((event: any) => {
        dispatch(setProductParams({ searchTerm: event.target.value }))
    }, 1000)

    const screenSize = useScreenSize();

    return (
        <Paper elevation={screenSize === "xs" ? 0 : 1} sx={{ opacity: 0.5 }}>
            <TextField
                label={screenSize === "xs" || screenSize === "sm" ? null : "Search products"}
                variant="outlined"
                placeholder="Search product"
                value={searchTerm || ''}
                onChange={(event: any) => {
                    setSearchTerm(event.target.value);
                    debouncedSearch(event);
                }}
                size={screenSize === "xs" || screenSize === "sm" ? 'small' : 'medium'}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    },
                }}
            />
        </Paper>
    )
}