import { useEffect, useState } from "react";
import agent from "../../App/api/agent";
import LoadingComponent from "../../App/layout/LoadingComponent";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { Basket } from "../../App/models/basket";
import { LoadingButton } from "@mui/lab";

function BasketPage() {
    const [status, setStatus] = useState({
        loading: false,
        name: '',
    });
    const [basket, setBasket] = useState<Basket | null>(null);

    useEffect(() => {
        setStatus({ loading: true, name: '' });
        agent.Basket.get()
            .then(basket => setBasket(basket))
            .catch(err => console.log(err))
            .finally(() => setStatus({ loading: false, name: '' }));
    }, [])

    //TODO: Fix the error response when adding item
    function handleAddItem(productId: number, name: string) {
        setStatus({ loading: true, name });
        agent.Basket.addItem(productId)
            .then(basket => setBasket(basket))
            .catch(err => console.log(err))
            .finally(() => setStatus({ loading: false, name: '' }));
    }

    function handleRemoveItem(productId: number, quantity: number, name: string) {
        setStatus({ loading: true, name });
        agent.Basket.removeItem(productId, quantity)
            .then(basket => setBasket(basket))
            .catch(err => console.log(err))
            .finally(() => setStatus({ loading: false, name: '' }));
    }

    if (status.loading && status.name == '') return <LoadingComponent message="Loading basket..." />

    if (!basket) return <Typography variant='h3'>Your basket is empty</Typography>

    return (
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
                                    {item.name}
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
        </TableContainer >
    )
}

export default BasketPage