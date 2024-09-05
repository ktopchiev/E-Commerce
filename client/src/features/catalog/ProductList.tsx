import { Grid2 } from "@mui/material"
import ProductCard from "./ProductCard"
import Props from "../../App/interfaces/Props"

function ProductList({ products }: Props) {

    return (

        <Grid2 container spacing={4}>
            {products.map((product) => (
                <Grid2 size={3} key={product.id}>
                    <ProductCard product={product} />
                </Grid2>
            ))}
        </Grid2>
    )
}

export default ProductList