import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import { Product } from "../../App/models/product";
import agent from "../../App/api/agent";
import LoadingComponent from "../../App/layout/LoadingComponent";

function Catalog() {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Catalog.list()
            .then(products => setProducts(products))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [])

    if (loading) return <LoadingComponent message="Loading products..." />

    return (
        <>
            <ProductList products={products} />
        </>
    )
}

export default Catalog;