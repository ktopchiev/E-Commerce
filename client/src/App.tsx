import { useState, useEffect } from "react";
import { Product } from "./product";

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
			<ul>
				{products.map((product) =>
					(<li key={product.id}>{product.name}</li>)
				)}
			</ul>
			<button onClick={addProduct}>Add Product</button>
		</div>
	)
}

export default App
