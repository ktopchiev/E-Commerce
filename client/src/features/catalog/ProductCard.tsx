import { Typography, Button, Card, CardActions, CardContent, CardMedia, Avatar, CardHeader } from "@mui/material"
import { Product } from "../../App/models/product"
import { Link } from "react-router-dom";
import { LoadingButton } from '@mui/lab';
import { AddShoppingCart, VisibilityOutlined } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../App/store/configureStore";
import { addItemToBasketAsync } from "../basket/basketSlice";

interface ProductCardProps {
    product: Product;
}

function ProductCard({ product }: ProductCardProps) {

    const { status } = useAppSelector(state => state.basket)
    const dispatch = useAppDispatch();

    return (
        <Card sx={{ maxWidth: 345 }} key={product.id}>
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
                <LoadingButton
                    loading={status === 'pendingAddItem' + product.id}
                    onClick={() => dispatch(addItemToBasketAsync({ productId: product.id }))}
                    size="small"
                >
                    <AddShoppingCart />
                </LoadingButton>
                <Button
                    component={Link}
                    to={`${product.id}`}
                    size="small"
                >
                    <VisibilityOutlined />
                </Button>
            </CardActions>
        </Card >
    )
}

export default ProductCard