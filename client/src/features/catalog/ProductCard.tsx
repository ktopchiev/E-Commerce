import { Typography, Button, Card, CardActions, CardContent, CardMedia, Avatar, CardHeader } from "@mui/material"
import { Product } from "../../App/models/product"

interface ProductCardProps {
    product: Product;
}

function ProductCard({ product }: ProductCardProps) {

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar variant="circular" sx={{ bgcolor: 'secondary.main' }}>
                        {product.name.toString().charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={{
                    sx: {
                        fontWeight: 'bold',
                        color: 'primary.main'
                    }
                }}
            >
            </CardHeader>
            <CardMedia
                sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.light' }}
                image={product.pictureUrl}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" sx={{ color: 'secondary.main' }}>
                    ${(product.price / 100).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.type}/{product.brand}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Add to Card</Button>
                <Button size="small">View</Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard