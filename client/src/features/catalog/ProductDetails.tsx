import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"
import { Divider, Grid2, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import NotFound from "../../App/errors/NotFound";
import LoadingComponent from "../../App/layout/common/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../App/store/configureStore";
import { addItemToBasketAsync } from "../basket/basketSlice";
import { fetchProductAsync, productsSelectors } from "./catalogSlice";

function ProductDetails() {

    const { id } = useParams<{ id: string }>();
    const product = useAppSelector((state) => productsSelectors.selectById(state, parseInt(id!)));
    const { status: productStatus } = useAppSelector(state => state.catalog);
    const { basket, status } = useAppSelector(state => state.basket);
    const basketItem = basket?.items.find(item => item.productId === product?.id);
    const dispatch = useAppDispatch();

    const [quantity, setQuantity] = useState(0);
    const quantityInBasket = useRef(0);

    useEffect(() => {

        if (basketItem) {
            setQuantity(basketItem.quantity)
            quantityInBasket.current = basketItem.quantity;
        }

        if (!product) dispatch(fetchProductAsync(parseInt(id!)));

    }, [id, product, basketItem, dispatch])

    function handleChangeQuantity(event: React.ChangeEvent<HTMLInputElement>) {

        const targetValue = parseInt(event.target.value);

        if (targetValue > 0) {
            setQuantity(targetValue);
        }
    }

    if (productStatus.includes('pending')) return <LoadingComponent message="Loading product..." />

    if (!product) return <NotFound />

    return (
        <Grid2 container spacing={6}>
            <Grid2 size={6}>
                <img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }} />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
                <Typography sx={{ typography: { xs: 'h6', md: 'h3' } }}>{product.name}</Typography>
                <Divider sx={{ mb: 2 }} />
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid2 container spacing={2}>
                    <Grid2 size={6}>
                        <TextField
                            label="Quantity in Cart"
                            type="number"
                            value={quantity}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            fullWidth
                            onChange={handleChangeQuantity}
                        />

                    </Grid2>
                    <Grid2 size={6}>
                        <LoadingButton
                            disabled={quantity === 0 || quantity === basketItem?.quantity}
                            loading={status.includes('pending')}
                            color="primary"
                            variant="contained"
                            size="large"
                            sx={{ height: '55px' }}
                            fullWidth
                            onClick={() => dispatch(
                                addItemToBasketAsync({
                                    productId: product.id,
                                    quantity: quantity - quantityInBasket.current
                                })
                            )}
                        >
                            {basketItem ? "Update Quantity" : "Add to Cart"}
                        </LoadingButton>
                    </Grid2>
                </Grid2>
            </Grid2>
        </Grid2 >
    )
}

export default ProductDetails