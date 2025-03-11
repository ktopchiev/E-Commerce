import { Typography, Card, CardActions, CardContent, CardMedia, Avatar, CardHeader, CardActionArea } from "@mui/material"
import { Product } from "../../../App/models/product"
import { useNavigate } from "react-router-dom";
import { LoadingButton } from '@mui/lab';
import { AddShoppingCart } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../App/store/configureStore";
import { addItemToBasketAsync } from "../../basket/basketSlice";
import { useScreenSize } from "../../../App/hooks/useScreenSize";
import { minimizeTitle } from "../../../App/util/util";
import DoneIcon from '@mui/icons-material/Done';

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
            <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <LoadingButton
                    loading={status === 'pendingAddItem' + product.id}
                    onClick={() => {
                        dispatch(addItemToBasketAsync({ productId: product.id }));
                    }}
                    size="small"
                    sx={{
                        backgroundColor: "rgb(10, 80, 221)", // Keep background
                        "&.MuiLoadingButton-loading": {
                            backgroundColor: "rgba(10, 80, 221)", // Slightly transparent to show spinner
                        },
                        "& .MuiCircularProgress-root": {
                            color: "blue", // Make sure spinner is visible
                        },
                        minHeight: "32px"
                    }}
                    loadingIndicator={<DoneIcon sx={{
                        color: 'rgb(100, 253, 153)',
                        animation: "spin 0.7s linear", // Add spin animation
                        "@keyframes spin": {
                            "0%": { transform: "rotate(0deg)" },
                            "100%": { transform: "rotate(360deg)" }
                        }
                    }} />}
                >
                    {status !== "pendingAddItem" + product.id && < AddShoppingCart sx={{ color: 'white' }} />}
                </LoadingButton>
            </CardActions>

        </Card >
    )
}

export default ProductCard