import ProductList from "./ProductList";
import { useEffect } from "react";
import LoadingComponent from "../../App/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../App/store/configureStore";
import { fetchFiltersAsync, fetchProductsAsync, productsSelectors } from "./catalogSlice";
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid2, Paper, Radio, RadioGroup, TextField } from "@mui/material";

function Catalog() {

    const products = useAppSelector(productsSelectors.selectAll);
    const dispatch = useAppDispatch();
    const { productsLoaded, status, filtersLoaded, brands, types } = useAppSelector(state => state.catalog)

    const sortOptions = [
        { value: 'name', label: "Alphabetical" },
        { value: 'priceDesc', label: "Price - High to Low" },
        { value: 'price', label: "Price - Low to High" }
    ];

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());

    }, [productsLoaded, dispatch])

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFiltersAsync());

    }, [dispatch, filtersLoaded])

    if (status.includes('pending')) return <LoadingComponent message="Loading products..." />

    return (
        <>
            <Grid2 container spacing={4}>
                <Grid2 size={3}>
                    <Paper sx={{ mb: 2 }}>
                        <TextField id="outlined-basic" label="Search products" variant="outlined" fullWidth />
                    </Paper>
                    <Paper sx={{ mb: 2, p: 2 }}>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Sort by</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                {sortOptions.map(({ value, label }) =>
                                    <FormControlLabel value={value} control={<Radio />} label={label} />
                                )}

                            </RadioGroup>
                        </FormControl>
                    </Paper>
                    <Paper sx={{ mb: 2, p: 2 }}>
                        <FormControl>
                            <FormLabel>Brands</FormLabel>
                            <FormGroup>
                                {brands.map(brand =>
                                    <FormControlLabel control={<Checkbox />} label={brand} />
                                )}
                            </FormGroup>
                        </FormControl>
                    </Paper>
                    <Paper sx={{ mb: 2, p: 2 }}>
                        <FormControl>
                            <FormLabel>Types</FormLabel>
                            <FormGroup>
                                {types.map(type =>
                                    <FormControlLabel control={<Checkbox />} label={type} />
                                )}
                            </FormGroup>
                        </FormControl>
                    </Paper>
                </Grid2>
                <Grid2 size={9}>
                    <ProductList products={products} />
                </Grid2>
            </Grid2>
        </>
    )
}

export default Catalog;