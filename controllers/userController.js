const asyncHandler = require("express-async-handler");
const User = require("../models/user");
var bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const passport = require("passport");

// get
exports.register_get = asyncHandler(async (req, res, next) => {
	if (res.locals.currentUser) return res.redirect("/");
	res.render("register", {
		title: "Register",
	});
});

exports.login_get = asyncHandler(async (req, res, next) => {
	if (res.locals.currentUser) return res.redirect("/");
	res.render("login", {
		title: "Login",
		sessionError: req.session.messages,
	});
});

exports.logout_get = asyncHandler(async (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		res.redirect("/");
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
			return res.render("register", {
				errors: errorObject,
				username: req.body.username,
			});
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

exports.login_post = [
	body("username", "Username must be 3 - 20 characters")
		.trim()
		.isLength({ min: 3, max: 20 }),
	body("password", "Password must be atleast 6 characters")
		.trim()
		.isLength({ min: 6 }),
	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			let errorObject = {};
			errors.array().map((error) => {
				errorObject[error.path] = error.msg;
			});
			return res.render("login", {
				errors: errorObject,
				username: req.body.username,
			});
		}
		next();
	}),
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/login",
		failureMessage: true,
	}),
];
