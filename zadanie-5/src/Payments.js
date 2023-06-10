import React, { useEffect, useState } from 'react';

const Payments = () => {
	const [dataPayments, setDataPayments] = useState('');
	const [loaded, setLoaded] = useState(false);
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = { amount: dataPayments };
		fetch('http://localhost:1323/payments', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => setLoaded(true))
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
			{loaded && <p>Wysłano płatność</p>}
		</div>
	);
};

export default Payments;
