import { useState } from "react";
import agent from "../../App/api/agent";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box, Typography, Grid2, Button } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useStoreContext } from "../../App/context/StoreContext";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";

function BasketPage() {

    const { basket, setBasket, removeItem } = useStoreContext();

    const [status, setStatus] = useState({
        loading: false,
        name: '',
    });

    if (!basket) return <Typography variant='h3'>Your basket is empty</Typography>

    function handleAddItem(productId: number, name: string) {
        setStatus({ loading: true, name });
        agent.Basket.addItem(productId)
            .then(basket => setBasket(basket))
            .catch(err => console.log(err))
            .finally(() => setStatus({ loading: false, name: '' }));
    }

    function handleRemoveItem(productId: number, quantity = 1, name: string) {
        setStatus({ loading: true, name });
        agent.Basket.removeItem(productId, quantity)
            .then(() => removeItem(productId, quantity))
            .catch(err => console.log(err))
            .finally(() => setStatus({ loading: false, name: '' }));
    }

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
                                            loading={status.loading && status.name === 'rem' + item.productId}
                                            onClick={() => handleRemoveItem(item.productId, 1, 'rem' + item.productId)}>
                                            <Remove />
                                        </LoadingButton>
                                        {item.quantity}
                                        <LoadingButton
                                            loading={status.loading && status.name === 'add' + item.productId}
                                            onClick={() => handleAddItem(item.productId, 'add' + item.productId)}>
                                            <Add />
                                        </LoadingButton>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">${(item.price / 100 * item.quantity).toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    <LoadingButton
                                        loading={status.loading && status.name === 'del' + item.productId}
                                        onClick={() => handleRemoveItem(item.productId, item.quantity, 'del' + item.productId)}>
                                        <Delete />
                                    </LoadingButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
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