import { useEffect, useState } from "react";
import agent from "../../App/api/agent";
import LoadingComponent from "../../App/layout/LoadingComponent";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box, Typography } from "@mui/material";
import { Delete, Height } from "@mui/icons-material";
import { Basket } from "../../App/models/basket";
import { LoadingButton } from "@mui/lab";

function BasketPage() {
    const [loading, setLoading] = useState(false);
    const [basket, setBasket] = useState<Basket | null>(null);

    useEffect(() => {
        setLoading(true);
        agent.Basket.get()
            .then(basket => setBasket(basket))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, [setBasket])


    function handleAddItem(productId: number, quantity: number) {
        agent.Basket.addItem(productId, quantity)
            .then(basket => setBasket(basket))
            .catch(err => console.log(err))
    }

    function handleRemoveItem(productId: number, quantity: number) {
        setLoading(true);
        agent.Basket.removeItem(productId, quantity)
            .then(basket => setBasket(basket))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }

    // if (loading) return <LoadingComponent message="Loading basket..."></LoadingComponent>

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Subtotal</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {basket?.items.map(item => (
                        <TableRow
                            key={item.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={item.pictureUrl} style={{ height: 50, marginRight: 20 }} />
                                    {item.name}
                                </Box>
                            </TableCell>
                            <TableCell align="right">${(item.price / 100).toFixed(2)}</TableCell>
                            <TableCell align="right">{item.quantity}</TableCell>
                            <TableCell align="right">${(item.price / 100 * item.quantity).toFixed(2)}</TableCell>
                            <TableCell align="right">
                                <LoadingButton loading={loading} onClick={() => handleRemoveItem(item.productId, item.quantity)}>
                                    <Delete />
                                </LoadingButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default BasketPage