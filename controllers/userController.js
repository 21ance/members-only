const asyncHandler = require("express-async-handler");
const User = require("../models/user");
var bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

// get
exports.register_get = asyncHandler(async (req, res, next) => {
	res.render("register", {
		title: "Register",
	});
});
exports.login_get = asyncHandler(async (req, res, next) => {
	res.render("login", {
		title: "Login",
	});
});

// post
exports.register_post = [
	body("username", "Username must be 3 - 20 characters")
		.trim()
		.isLength({ min: 3, max: 20 }),
	body("password", "Password must be atleast 6 characters")
		.trim()
		.isLength({ min: 6 }),
	body("passwordConfirm", "Passwords does not match").custom(
		(value, { req }) => {
			return value === req.body.password;
		}
	),
	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			let errorObject = {};
			errors.array().map((error) => {
				errorObject[error.path] = error.msg;
			});
			return res.render("register", { errors: errorObject });
		}

		const user = new User({
			username: req.body.username,
			password: req.body.password,
		});

		// check if user exists
		const userExists = await User.findOne({ username: user.username });
		if (userExists) {
			res.render("register", {
				title: "Register",
				error: "User already exists",
			});
		}

		try {
			// encrypt password using bcrypt
			bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
				user.password = hashedPassword;
				await user.save();
				res.redirect("/");
			});
		} catch (err) {
			console.log(err);
			return next(err);
		}
	}),
];
