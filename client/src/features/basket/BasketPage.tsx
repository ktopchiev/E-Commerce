import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box, Typography, Grid2, Button } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../App/store/configureStore";
import { addItemToBasketAsync, removeItemFromBasketAsync } from "./basketSlice";

function BasketPage() {

    const { basket, status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    if (!basket) return <Typography variant='h3'>Your basket is empty</Typography>

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                                        <span>{item.name}</span>
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
                                <TableCell align="right">${(item.price / 100 * item.quantity).toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    <LoadingButton
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
            <Grid2 container sx={{ display: "flex", justifyContent: "flex-end" }}>
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