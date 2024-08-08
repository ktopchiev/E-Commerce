import { Button } from "@mui/material";
import ProductList from "./ProductList";
import Props from "../interfaces/Props";

interface CatalogProps extends Props {
    addProduct: () => void;
}

function Catalog({ products, addProduct }: CatalogProps) {

    return (
        <>
            <ProductList products={products} />
            <Button variant="contained" onClick={addProduct}>Add Product</Button>
        </>
    )
}

export default Catalog;