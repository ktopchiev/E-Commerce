import { Typography, Button, Card, CardActions, CardContent, CardMedia } from "@mui/material"
import { Product } from "../../App/models/product"

interface ProductCardProps {
    product: Product;
}

function ProductCard({ product }: ProductCardProps) {

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image={product.pictureUrl}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard