const asyncHandler = require("express-async-handler");
const User = require("../models/user");

exports.membership_get = asyncHandler(async (req, res, next) => {
	if (!res.locals.currentUser) return res.redirect("/login");
	const members = await User.find({ member_status: "member" }).exec();
	res.render("membership", { title: "Membership", member_list: members });
});

exports.membership_post = asyncHandler(async (req, res, next) => {
	if (req.body.secret !== process.env.SECRET) {
		return res.render("membership", {
			title: "Membership",
			error: "Incorrect code",
		});
	}
	const user = new User({
		_id: res.locals.currentUser._id,
		username: res.locals.currentUser.username,
		password: res.locals.currentUser.password,
		member_status: "member",
	});
	await User.findByIdAndUpdate(res.locals.currentUser._id, user).exec();
	res.redirect("/membership");
});
