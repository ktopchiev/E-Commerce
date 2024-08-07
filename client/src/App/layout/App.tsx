import { useState, useEffect } from "react";
import { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";

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
			<h1 style={{ color: 'red' }}>E-Commerce</h1>
			<Catalog products={products} addProduct={addProduct} />
		</div>
	)
}

export default App
