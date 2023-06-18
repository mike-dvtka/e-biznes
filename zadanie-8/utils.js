const search = (array, mail, pswd) => {
	return array.find(
		({ email, password }) => email === mail && password === pswd
	);
};

module.exports = { search };
