import React, { useEffect, useState } from 'react';

const Payments = () => {
	const [dataPayments, setDataPayments] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		
		fetch('http://localhost:1323/products', {
			method: 'POST',
			body: JSON.stringify(dataPayments),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((error) => console.log(error));
	};

	const handleChange = (event) => {
		setDataPayments(event.target.value);
	};

	return (
		<div>
			<h2>Płatności</h2>
			<form onSubmit={handleSubmit}>
				<label>
					Dane płatności:
					<input
						type='text'
						value={dataPayments}
						onChange={handleChange}
					/>
				</label>
				<button type='submit'>Wyślij</button>
			</form>
		</div>
	);
};

export default Payments;
