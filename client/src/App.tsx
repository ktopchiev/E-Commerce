import { useState, useEffect } from "react";

function App() {

	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetch('http://localhost:5000/api/products')
			.then(response => response.json())
			.then(data => setProducts(data));
	}, [])

	return (
		<div>
			<h1 style={{ color: 'red' }}>E-Commerce</h1>
			<ul>
				{products.map((product) =>
					(<li key={product.id}>{product.name}</li>)
				)}
			</ul>
		</div>
	)
}

export default App
