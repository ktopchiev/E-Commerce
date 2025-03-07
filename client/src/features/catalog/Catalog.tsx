import ProductList from "./ProductList";
import { useEffect } from "react";
import LoadingComponent from "../../App/layout/common/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../App/store/configureStore";
import { fetchFiltersAsync, fetchProductsAsync, productsSelectors, setPageNumber, setProductParams } from "./catalogSlice";
import { Grid2, Paper, useMediaQuery } from "@mui/material";
import ProductSearch from "../../App/common/ProductSearch";
import RadioButtonGroup from "../../App/common/RadioButtonGroup";
import CheckboxButtons from "../../App/common/CheckboxButtons";
import AppPagination from "../../App/common/AppPagination";

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

    const isMobile = useMediaQuery("(max-width: 670px)");

    if (!filtersLoaded) return <LoadingComponent message="Loading products..." />

    return (
        <>
            <Grid2 container columnSpacing={2}>
                {
                    !isMobile &&
                    <Grid2 size={{ md: 3 }}>
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
                }
                <Grid2 sx={{ display: { xs: 'block' } }} size={{ xs: 12, md: 9 }}>
                    <ProductList products={products} />
                </Grid2>
                <Grid2 size={3}>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 9 }} sx={{ mt: 2, mb: 10 }}>
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