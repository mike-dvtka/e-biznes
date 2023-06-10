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
				{Object.values(products).map((product) => (
					<li key={product.id}>
						{product.name} - {product.price} zł
					</li>
				))}
			</ul>
		</div>
	);
};

export default Products;
