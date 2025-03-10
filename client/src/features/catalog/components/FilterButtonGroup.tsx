import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import SortIcon from '@mui/icons-material/Sort';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RadioButtonGroup from '../../../App/common/RadioButtonGroup';
import { useAppDispatch, useAppSelector } from '../../../App/store/configureStore';
import { setProductParams } from '../catalogSlice';

const sortOptions = [
    { value: 'name', label: "Alphabetical" },
    { value: 'priceDesc', label: "Price - High to Low" },
    { value: 'price', label: "Price - Low to High" }
];

export default function FilterButtonGroup() {
    const [open, setOpen] = React.useState(false);
    // const [options, setOptions] = React.useState<object[]>([]);
    const anchorRef = React.useRef<HTMLDivElement>(null);
    // const [selectedIndex, setSelectedIndex] = React.useState(1);
    const dispatch = useAppDispatch();
    const { productParams } = useAppSelector(state => state.catalog);

    // const handleMenuItemClick = (
    //     event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    //     index: number,
    // ) => {
    //     setSelectedIndex(index);
    //     setOpen(false);
    // };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    return (
        <React.Fragment>
            <ButtonGroup
                variant="contained"
                ref={anchorRef}
                aria-label="Button group with a nested filter and sort menu"
                size="small"
            >
                <Button onClick={handleToggle}>
                    <SortIcon />
                    Sort
                </Button>
                <Button
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}   
                >
                    <FilterAltIcon />
                    Filter
                </Button>
            </ButtonGroup>
            <Popper
                sx={{ zIndex: 1 }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <RadioButtonGroup
                                    selectedValue={productParams.orderBy}
                                    options={sortOptions}
                                    onChange={(e) => dispatch(setProductParams({ orderBy: e.target.value }))}
                                />
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment >
    );
}
