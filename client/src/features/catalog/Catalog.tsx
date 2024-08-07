import { Product } from "../../App/models/product";

interface Props {
    products: Product[],
    addProduct: () => void
}

function Catalog({ products, addProduct }: Props) {

    return (
        <>
            <ul>
                {products.map((product) =>
                    (<li key={product.id}>{product.name}</li>)
                )}
            </ul>
            <button onClick={addProduct}>Add Product</button>
        </>
    )
}

export default Catalog;