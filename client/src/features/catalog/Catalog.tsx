import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { Product } from "../../App/models/product";

interface Props {
    products: Product[],
    addProduct: () => void
}

function Catalog({ products, addProduct }: Props) {

    return (
        <>
            <List>
                {products.map((product) =>
                (<ListItem key={product.id}>
                    <ListItemAvatar>
                        <Avatar src={product.pictureUrl}></Avatar>
                    </ListItemAvatar>
                    <ListItemText>
                        <Typography variant="body2">
                            {product.name}
                        </Typography>
                    </ListItemText>
                </ListItem>)
                )}
            </List>
            <Button variant="contained" onClick={addProduct}>Add Product</Button>
        </>
    )
}

export default Catalog;