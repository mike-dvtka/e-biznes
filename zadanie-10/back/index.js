const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 5000;

let products = [];

app.get('/products', (req, res) => {
	res.json(products);
});

app.get('/products/:index', (req, res) => {
	const index = req.params.index;
	if (index >= 0 && index < products.length) {
		res.json(products[index]);
	} else {
		res.status(404).json({ error: 'Produkt nie istnieje' });
	}
});

app.post('/products', (req, res) => {
	const { name, price } = req.body;
	const newProduct = { name, price };
	products.push(newProduct);
	res.status(201).json(newProduct);
});

app.put('/products/:index', (req, res) => {
	const index = req.params.index;
	if (index >= 0 && index < products.length) {
		const { name, price } = req.body;
		products[index] = { name, price };
		res.json(products[index]);
	} else {
		res.status(404).json({ error: 'Produkt nie istnieje' });
	}
});

app.delete('/products/:index', (req, res) => {
	const index = req.params.index;
	if (index >= 0 && index < products.length) {
		const deletedProduct = products.splice(index, 1);
		res.json(deletedProduct[0]);
	} else {
		res.status(404).json({ error: 'Produkt nie istnieje' });
	}
});

app.listen(port, () => {
	console.log(`Serwer CRUD jest uruchomiony na porcie ${port}`);
});
