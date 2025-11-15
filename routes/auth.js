const router = require('express');
const User = require('../model/User');
const bcrypt = require('bcrypt');
const { registerValidation } = require('../validation');

router.post('/register', async (req, res) => {
	// LET US VALIDATE THE DATA BEFORE WE MAKE A USER
	const { error } = registerValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	
	// CHECKING IF THE USER IS ALREADY IN THE DATABASE
	const emailExist = await User.findOne({ email : req.body.email });
	if (emailExist) return res.status(400).send('Email already exists');
	
	// HASH PASSWORDS
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);
	
	// CREATE A NEW USER
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword
	});
	try {
		const savedUser = await user.save();
		res.send({ user: user._id });
	} catch (err) {
		res.status(400).send(err);
	}
});

router.post('/login', async (req, res) => {
	// LET US VALIDATE THE DATA BEFORE WE MAKE A USER
	const { error } = loginValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	
	// CHECKING IF THE USER IS ALREADY IN THE DATABASE
	const emailExists = await User.findOne({ email : req.body.email });
	if (!emailExists) return res.status(400).send('Email does not exist');
	
	// CHECK IF PASSWORD IS CORRECT
	const validPass = await bcrypt.compare(req.body.password, user.password);
	if (!validPass) return res.status(400).send('Invalid Password');
	
	// CREATE AND ASSIGN A TOKEN
	const token = jwt.sign({ _id : user._id }, process.env.TOKEN_SECRET);
	res.header('auth-token', token).send(token);
});

module.exports = router;