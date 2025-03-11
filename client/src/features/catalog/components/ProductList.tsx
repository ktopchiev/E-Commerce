import { Grid2 } from "@mui/material"
import ProductCard from "./ProductCard"
import Props from "../../../App/interfaces/Props"
import { useAppSelector } from "../../../App/store/configureStore"
import ProductCardSkeleton from "./ProductCardSkeleton";

function ProductList({ products }: Props) {
    const { productsLoaded } = useAppSelector(state => state.catalog);
    return (

        <Grid2 container spacing={{ xs: 1, sm: 2, md: 4 }}>
            {products.map((product) => (
                <Grid2 size={{ xs: 6, sm: 4, md: 4 }} key={product.id}>
                    {!productsLoaded ?
                        (<ProductCardSkeleton />) :
                        (< ProductCard product={product} />)
                    }
                </Grid2>
            ))}
        </Grid2 >
    )
}

export default ProductList