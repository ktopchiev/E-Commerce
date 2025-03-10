import { Typography, Button, Card, CardActions, CardContent, CardMedia, Avatar, CardHeader, CardActionArea } from "@mui/material"
import { Product } from "../../../App/models/product"
import { Link, useNavigate } from "react-router-dom";
import { LoadingButton } from '@mui/lab';
import { AddShoppingCart, VisibilityOutlined } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../App/store/configureStore";
import { addItemToBasketAsync } from "../../basket/basketSlice";
import { useScreenSize } from "../../../App/hooks/useScreenSize";
import { minimizeTitle } from "../../../App/util/util";

interface ProductCardProps {
    product: Product;
}

function ProductCard({ product }: ProductCardProps) {

    const { status } = useAppSelector(state => state.basket)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const screenSize = useScreenSize();

    const styles = {
        cardMediaStyle: {
            height: screenSize === "xs" ? 100 : 140,
            backrgoundSize: 'contain',
            bgcolor: 'primary.light',
        }
    }

    return (
        <Card sx={{ maxWidth: 345 }} key={product.id}>
            <CardActionArea onClick={() => navigate(`/catalog/${product.id}`)}>
                <CardHeader
                    avatar={
                        <Avatar variant="circular" sx={{ bgcolor: 'secondary.main' }}>
                            {product.name.toString().charAt(0).toUpperCase()}
                        </Avatar>
                    }
                    title={screenSize === "xs" ? minimizeTitle(product.name) : product.name}
                    titleTypographyProps={{
                        sx: {
                            fontWeight: 'bold',
                            color: 'primary.main'
                        }
                    }}
                    sx={{ maxHeight: 72, px: 1 }}
                >
                </CardHeader>
                <CardMedia
                    sx={styles.cardMediaStyle}
                    image={product.pictureUrl}
                    title={product.name}
                />
                <CardContent>
                    <Typography gutterBottom sx={{ color: 'secondary.main', typography: { xs: "body1", md: 'h6' } }}>
                        ${(product.price / 100).toFixed(2)}
                    </Typography>
                    <Typography sx={{ typography: { xs: "caption" }, color: 'text.secondary' }}>
                        {product.type}/{product.brand}
                    </Typography>
                </CardContent>
            </CardActionArea>
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