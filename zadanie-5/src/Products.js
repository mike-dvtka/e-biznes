import React, { useEffect, useState } from 'react';

const Products = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetch('http://localhost:1323/products')
			.then((response) => response.json())
			.then((data) => setProducts(data))
			.catch((error) => console.log(error));
	}, []);

	return (
		<div>
			<h2>Products</h2>
			<ul>
				{products.map((product) => (
					<li key={product.id}>{product.title}</li>
				))}
			</ul>
		</div>
	);
};

export default Products;
