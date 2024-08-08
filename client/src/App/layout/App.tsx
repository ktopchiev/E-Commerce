import { useState, useEffect } from "react";
import { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import { Container, CssBaseline } from "@mui/material";
import Header from "./Header";

function App() {

	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		fetch('http://localhost:5000/api/products')
			.then(response => response.json())
			.then(data => setProducts(data));
	}, [])

	function addProduct() {
		setProducts(prevState => [...products, {
			id: prevState.length + 1,
			name: "product" + (prevState.length + 1),
			description: 'some description',
			brand: 'some brand',
			pictureUrl: 'http://picsum.photos/200',
			price: 200
		}])
	}

	return (
		<div>
			<CssBaseline />
			<Header />
			<Container>
				<Catalog products={products} addProduct={addProduct} />
			</Container>
		</div>
	)
}

export default App
