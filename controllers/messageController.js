const asyncHandler = require("express-async-handler");
const Message = require("../models/message");
const { body, validationResult } = require("express-validator");

// get
exports.new_message_get = asyncHandler(async (req, res, next) => {
	if (!res.locals.currentUser) return res.redirect("/login");
	res.render("new_message", {
		title: "New Message",
	});
});

// post
exports.new_message_post = [
	body("message_title", "Message title is required")
		.trim()
		.isLength({ min: 1 }),
	body("message", "Message content is required")
		.trim()
		.isLength({ min: 1, max: 200 }),
	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			let errorObject = {};
			errors.array().map((error) => {
				errorObject[error.path] = error.msg;
			});
			return res.render("new_message", {
				errors: errorObject,
				message_title: req.body.message_title,
				message: req.body.message,
			});
		}

		const message = new Message({
			title: req.body.message_title,
			message: req.body.message,
			date_created: new Date(),
			user: res.locals.currentUser._id.toString(),
		});

		try {
			await message.save();
			res.redirect("/");
		} catch (err) {
			console.log(err);
			return next(err);
		}
	}),
];

exports.delete_message_post = asyncHandler(async (req, res, next) => {
	await Message.findByIdAndDelete(req.params.message).exec();
	res.redirect("/");
});
