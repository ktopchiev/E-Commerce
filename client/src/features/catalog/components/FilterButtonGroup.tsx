import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import SortIcon from '@mui/icons-material/Sort';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RadioButtonGroup from '../../../App/common/RadioButtonGroup';
import { useAppDispatch, useAppSelector } from '../../../App/store/configureStore';
import { setProductParams } from '../catalogSlice';
import { Box, Menu, MenuItem, useTheme } from '@mui/material';
import CheckboxButtons from '../../../App/common/CheckboxButtons';

const sortOptions = [
    { value: 'name', label: "Alphabetical" },
    { value: 'priceDesc', label: "Price - High to Low" },
    { value: 'price', label: "Price - Low to High" }
];

export default function FilterButtonGroup() {
    const dispatch = useAppDispatch();
    const { productParams, types, brands } = useAppSelector(state => state.catalog);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const theme = useTheme();

    return (
        <React.Fragment>
            <ButtonGroup
                variant="outlined"
                aria-label="Button group with a nested filter and sort menu"
                size="small"
                sx={{
                    backgroundColor: theme.palette.mode === "dark" ? '#1f1f1f' : 'rgb(204, 205, 206)',
                    borderRadius: '20px'
                }}
            >
                <Button
                    id="sort-button"
                    aria-controls={open ? 'sort-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                    sx={{ color: theme.palette.mode === "dark" ? "rgb(254, 254, 254)" : "rgb(48, 47, 47)", border: 'none' }}
                >
                    <SortIcon />
                    Sort
                </Button>
                <Box sx={{ width: "1px", backgroundColor: "gray", height: "24px", alignSelf: "center" }} />
                <Menu
                    id="sort-menu"
                    anchorEl={anchorEl}
                    open={anchorEl?.id.includes("sort") || false}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'sort-button',
                    }}
                >
                    <MenuItem>
                        <RadioButtonGroup
                            selectedValue={productParams.orderBy}
                            options={sortOptions}
                            onChange={(e) => dispatch(setProductParams({ orderBy: e.target.value }))}
                        />
                    </MenuItem>
                </Menu>
                <Button
                    id="filter-button"
                    aria-controls={open ? 'filter-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                    sx={{ color: theme.palette.mode === "dark" ? "rgb(254, 254, 254)" : "rgb(48, 47, 47)", border: "none" }}
                >
                    <FilterAltIcon />
                    Filter
                </Button>
                <Menu
                    id="filter-menu"
                    anchorEl={anchorEl}
                    open={anchorEl?.id.includes("filter") || false}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'filter-button',
                    }}
                >
                    <MenuItem>
                        <CheckboxButtons
                            items={brands}
                            checked={productParams.brands}
                            onChange={(items: string[]) => dispatch(setProductParams({ brands: items }))}
                            label="Brands"
                        />
                    </MenuItem>
                    <MenuItem>
                        <CheckboxButtons
                            items={types}
                            checked={productParams.types}
                            onChange={(items: string[]) => dispatch(setProductParams({ types: items }))}
                            label="Types"
                        />
                    </MenuItem>
                </Menu>
            </ButtonGroup>
        </React.Fragment >
    );
}
