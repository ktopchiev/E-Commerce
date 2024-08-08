import { List } from "@mui/material"
import Props from "../interfaces/Props"
import ProductCard from "./ProductCard"

function ProductList({ products }: Props) {
    return (
        <List>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </List>
    )
}

export default ProductList