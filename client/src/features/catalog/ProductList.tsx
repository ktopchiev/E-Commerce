import { Grid } from "@mui/material"
import Props from "../interfaces/Props"
import ProductCard from "./ProductCard"

function ProductList({ products }: Props) {
    return (
        <Grid container spacing={4}>
            {products.map((product) => (
                <Grid item xs={3} key={product.id}>
                    <ProductCard product={product} />
                </Grid>
            ))}
        </Grid>
    )
}

export default ProductList