import ProductList from "./ProductList";
import { useEffect } from "react";
import LoadingComponent from "../../App/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../App/store/configureStore";
import { fetchFiltersAsync, fetchProductsAsync, productsSelectors, setPageNumber, setProductParams } from "./catalogSlice";
import { Grid2, Paper } from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../App/components/RadioButtonGroup";
import CheckboxButtons from "../../App/components/CheckboxButtons";
import AppPagination from "../../App/components/AppPagination";

function Catalog() {

    const products = useAppSelector(productsSelectors.selectAll);
    const dispatch = useAppDispatch();
    const { productsLoaded, filtersLoaded, brands, types, productParams, metaData } = useAppSelector(state => state.catalog)

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

    if (!filtersLoaded) return <LoadingComponent message="Loading products..." />
    return (
        <>
            <Grid2 container columnSpacing={4}>
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
                        <CheckboxButtons
                            items={brands}
                            checked={productParams.brands}
                            onChange={(items: string[]) => dispatch(setProductParams({ brands: items }))}
                            label="Brands"
                        />
                    </Paper>
                    <Paper sx={{ mb: 2, p: 2 }}>
                        <CheckboxButtons
                            items={types}
                            checked={productParams.types}
                            onChange={(items: string[]) => dispatch(setProductParams({ types: items }))}
                            label="Types"
                        />
                    </Paper>
                </Grid2>
                <Grid2 size={9}>
                    <ProductList products={products} />
                </Grid2>
                <Grid2 size={3}>
                </Grid2>
                <Grid2 size={9} sx={{ marginBottom: 2 }}>
                    {metaData &&
                        <AppPagination
                            metaData={metaData}
                            onPageChange={(page: number) => dispatch(setPageNumber({ pageNumber: page }))}
                        />
                    }
                </Grid2>
            </Grid2 >
        </>
    )
}

export default Catalog;