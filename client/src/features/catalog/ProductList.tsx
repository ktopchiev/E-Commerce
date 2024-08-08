import { Grid } from "@mui/material"
import Props from "../interfaces/Props"
import ProductCard from "./ProductCard"

function ProductList({ products }: Props) {
    return (
        <Grid container spacing={4}>
            {products.map((product) => (
                <Grid item>
                    <ProductCard key={product.id} product={product} />
                </Grid>
            ))}
        </Grid>
    )
}

export default ProductList