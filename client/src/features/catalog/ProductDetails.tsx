import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Product } from "../../App/models/product";
import { Divider, Grid2, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import agent from "../../App/api/agent";
import NotFound from "../../App/errors/NotFound";
import LoadingComponent from "../../App/layout/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import { useStoreContext } from "../../App/context/StoreContext";

function ProductDetails() {

    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const { basket, setBasket } = useStoreContext();
    const [quantity, setQuantity] = useState(0);
    const [submitting, setSubmitting] = useState(false);

    const item = basket?.items.find(item => item.productId === product?.id);

    useEffect(() => {
        if (item) setQuantity(item.quantity);
        id && agent.Catalog.details(parseInt(id))
            .then(product => setProduct(product))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [id, item, setBasket])

    function handleUpdateQuantity() {
        setSubmitting(true);
        if (!item || quantity !== item?.quantity) {
            const updatedQuantity = item ? quantity - item?.quantity : quantity;
            agent.Basket.addItem(product?.id, updatedQuantity)
                .then(basket => setBasket(basket))
                .catch(error => console.log(error))
                .finally(() => setSubmitting(false));
        } else {
            setSubmitting(false);
        }
    }

    function handleChangeQuantity(event: any) {
        if (event.target.value > 0) {
            setQuantity(parseInt(event.target.value));
        }
    }

    if (loading) return <LoadingComponent message="Loading product..." />

    if (!product) return <NotFound />

    return (
        <Grid2 container spacing={6}>
            <Grid2 size={6}>
                <img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }} />
            </Grid2>
            <Grid2 size={6}>
                <Typography variant="h3">{product.name}</Typography>
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
                            disabled={quantity === 0}
                            loading={submitting}
                            color="primary"
                            variant="contained"
                            size="large"
                            sx={{ height: '55px' }}
                            fullWidth
                            onClick={handleUpdateQuantity}
                        >
                            {item ? "Update Quantity" : "Add to Cart"}
                        </LoadingButton>
                    </Grid2>
                </Grid2>
            </Grid2>
        </Grid2 >
    )
}

export default ProductDetails