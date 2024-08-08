import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from "@mui/material"
import { Product } from "../../App/models/product"

interface ProductCardProps {
    product: Product;
}

function ProductCard({ product }: ProductCardProps) {

    return (
        <ListItem key={product.id}>
            <ListItemAvatar>
                <Avatar src={product.pictureUrl}></Avatar>
            </ListItemAvatar>
            <ListItemText>
                <Typography variant="body2">
                    {product.name}
                </Typography>
            </ListItemText>
        </ListItem>
    )
}

export default ProductCard