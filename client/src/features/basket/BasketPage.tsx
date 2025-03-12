import {
    TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box, Typography, Grid2,
    Button, Card, CardContent, CardMedia, IconButton, Container
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../App/store/configureStore";
import { addItemToBasketAsync, removeItemFromBasketAsync } from "./basketSlice";
import { useScreenSize } from "../../App/hooks/useScreenSize";

function BasketPage() {

    const { basket, status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    const screenSize = useScreenSize();

    if (!basket) return <Typography variant={screenSize === "xs" ? "body2" : "h6"}>Your basket is empty</Typography>

    return (
        <>
            {screenSize !== "xs" ?
                <TableContainer component={Paper} sx={{ display: "flex", justifyContent: "center" }}>
                    <Table sx={{ minWidth: 600 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="center">Quantity</TableCell>
                                <TableCell align="right">Subtotal</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {basket?.items.map(item => (
                                <TableRow
                                    key={item.productId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <img src={item.pictureUrl} style={{ height: 50, marginRight: 20 }} />
                                            <Typography sx={{ typography: { xs: 'none', sm: 'subtitle1' } }}>{item.name}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">${(item.price / 100).toFixed(2)}</TableCell>
                                    <TableCell align="center">
                                        <Box>
                                            <LoadingButton
                                                loading={status === 'pendingRemoveItem' + item.productId + 'rem'}
                                                onClick={() => dispatch(removeItemFromBasketAsync({ productId: item.productId, quantity: 1, operation: 'rem' }))}>
                                                <Remove />
                                            </LoadingButton>

                                            {item.quantity}

                                            <LoadingButton
                                                loading={status === 'pendingAddItem' + item.productId}
                                                onClick={() => dispatch(addItemToBasketAsync({ productId: item.productId }))}>
                                                <Add />
                                            </LoadingButton>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right" sx={{ p: 0 }}>${(item.price / 100 * item.quantity).toFixed(2)}</TableCell>
                                    <TableCell align="right" sx={{ pl: 0 }}>
                                        <LoadingButton
                                            color="error"
                                            loading={status === 'pendingRemoveItem' + item.productId + 'del'}
                                            onClick={() => dispatch(removeItemFromBasketAsync({ productId: item.productId, quantity: item.quantity, operation: 'del' }))}>
                                            <Delete />
                                        </LoadingButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer >
                :
                // Mobile view card
                <Container sx={{ p: 0, mb: 2 }}>
                    <Box sx={{ overflow: 'hidden', p: 0 }}>
                        {basket.items.map(item =>
                            <Card
                                key={item.productId}
                                sx={{ display: "flex", alignItems: "center", borderRadius: 2, boxShadow: 3, maxWidth: 670, mb: 1 }}
                            >
                                {/* Product Image */}
                                <CardMedia
                                    component="img"
                                    image={item.pictureUrl}
                                    alt={item.name}
                                    sx={{ width: 70, height: 70, objectFit: "cover", borderRadius: 5, pl: 1 }}
                                />

                                {/* Product Details */}
                                <CardContent sx={{ flex: "1", display: "flex", flexDirection: "column", gap: 1 }}>
                                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body2">Price: ${(item.price / 100).toFixed(2)}</Typography>
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography variant="body2">Quantity: </Typography>
                                        <LoadingButton
                                            sx={{ minWidth: '32px' }}
                                            loading={status === 'pendingRemoveItem' + item.productId + 'rem'}
                                            onClick={() => dispatch(removeItemFromBasketAsync({ productId: item.productId, quantity: 1, operation: 'rem' }))}>
                                            <Remove />
                                        </LoadingButton>

                                        {item.quantity}

                                        <LoadingButton
                                            sx={{ minWidth: '32px' }}
                                            loading={status === 'pendingAddItem' + item.productId}
                                            onClick={() => dispatch(addItemToBasketAsync({ productId: item.productId }))}>
                                            <Add />
                                        </LoadingButton>
                                    </Box>
                                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                        Subtotal: ${(item.price / 100 * item.quantity).toFixed(2)}
                                    </Typography>
                                </CardContent>

                                {/* Trash Button */}
                                <Box sx={{ pr: 3 }}>
                                    <IconButton
                                        color="error"
                                        onClick={() => dispatch(removeItemFromBasketAsync({
                                            productId: item.productId,
                                            quantity: item.quantity,
                                            operation: 'del'
                                        }))}
                                    >
                                        <Delete />
                                    </IconButton>
                                </Box>
                            </Card>
                        )}
                    </Box >
                </Container>
            }
            <Grid2 container sx={{ display: "flex", justifyContent: "flex-end", mb: 10 }}>
                <Grid ></Grid>
                <Grid >
                    <BasketSummary />
                    <Button
                        variant="contained"
                        color="success"
                        component={Link}
                        to='/checkout'
                        fullWidth
                    >
                        Checkout
                    </Button>
                </Grid>
            </Grid2>
        </>

    )
}

export default BasketPage