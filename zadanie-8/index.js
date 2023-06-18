const express = require('express');
const app = express();
const { search } = require('./utils');

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

const users = [];

app.get('/', (req, res) => {
	res.render('index.ejs', { msg: null });
});

app.post('/login', (req, res) => {
	const find = search(users, req.body.email, req.body.password);
	if (find) {
		res.render('logged.ejs', { name: find.name });
	} else {
		res.render('index.ejs', { msg: 'User not found' });
	}
});

app.post('/register', (req, res) => {
	users.push({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	});
	res.render('logged.ejs', { name: req.body.name });
});

app.post('/logout', (req, res) => {
	res.render('index.ejs', { msg: null });
});

app.listen(3000);
