import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import { Product } from "../../App/models/product";
import agent from "../../App/api/agent";

function Catalog() {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        agent.Catalog.list().then(products => setProducts(products));
    }, [])

    return (
        <>
            <ProductList products={products} />
        </>
    )
}

export default Catalog;