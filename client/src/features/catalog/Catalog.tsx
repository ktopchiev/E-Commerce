import { Button } from "@mui/material";
import ProductList from "./ProductList";
import Props from "../interfaces/Props";
import { useEffect, useState } from "react";
import { Product } from "../../App/models/product";

function Catalog() {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, [])

    return (
        <>
            <ProductList products={products} />
        </>
    )
}

export default Catalog;