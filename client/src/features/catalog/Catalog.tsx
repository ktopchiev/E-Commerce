import ProductList from "./ProductList";
import { useEffect } from "react";
import LoadingComponent from "../../App/layout/LoadingComponent"; 1
import { useAppDispatch, useAppSelector } from "../../App/store/configureStore";
import { fetchFiltersAsync, fetchProductsAsync, productsSelectors, setProductParams } from "./catalogSlice";
import {
    Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid2,
    Pagination, Paper, Typography
} from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../App/components/RadioButtonGroup";

function Catalog() {

    const products = useAppSelector(productsSelectors.selectAll);
    const dispatch = useAppDispatch();
    const { productsLoaded, status, filtersLoaded, brands, types, productParams } = useAppSelector(state => state.catalog)

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
                        <ProductSearch />
                    </Paper>
                    <Paper sx={{ mb: 2, p: 2 }}>
                        <RadioButtonGroup
                            selectedValue={productParams.orderBy}
                            options={sortOptions}
                            onChange={(e) => dispatch(setProductParams({ orderBy: e.target.value }))}
                        />
                    </Paper>
                    <Paper sx={{ mb: 2, p: 2 }}>
                        <FormControl>
                            <FormLabel>Brands</FormLabel>
                            <FormGroup>
                                {brands.map(brand =>
                                    <FormControlLabel control={<Checkbox />} label={brand} key={brand} />
                                )}
                            </FormGroup>
                        </FormControl>
                    </Paper>
                    <Paper sx={{ mb: 2, p: 2 }}>
                        <FormControl>
                            <FormLabel>Types</FormLabel>
                            <FormGroup>
                                {types.map(type =>
                                    <FormControlLabel control={<Checkbox />} label={type} key={type} />
                                )}
                            </FormGroup>
                        </FormControl>
                    </Paper>
                </Grid2>
                <Grid2 size={9}>
                    <ProductList products={products} />
                </Grid2>
                <Grid2 size={3}>

                </Grid2>
                <Grid2 size={9}>
                    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                        <Typography>Displaying 1-6 of 18 items</Typography>
                        <Pagination
                            color="secondary"
                            size="large"
                            count={10}
                            page={2}
                        />
                    </Box>
                </Grid2>
            </Grid2 >
        </>
    )
}

export default Catalog;