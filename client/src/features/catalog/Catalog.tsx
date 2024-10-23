import ProductList from "./ProductList";
import { useEffect } from "react";
import LoadingComponent from "../../App/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../App/store/configureStore";
import { fetchFiltersAsync, fetchProductsAsync, productsSelectors } from "./catalogSlice";

function Catalog() {

    const products = useAppSelector(productsSelectors.selectAll);
    const dispatch = useAppDispatch();
    const { productsLoaded, status, filtersLoaded } = useAppSelector(state => state.catalog)

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());

    }, [productsLoaded, dispatch])

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFiltersAsync());

    }, [dispatch, filtersLoaded])

    if (status.includes('pending')) return <LoadingComponent message="Loading products..." />

    return (
        <>
            <ProductList products={products} />
        </>
    )
}

export default Catalog;