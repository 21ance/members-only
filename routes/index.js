var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

// authentication routes
const auth_controller = require("../controllers/authController");
router.get("/register", auth_controller.register_get);
router.post("/register", auth_controller.register_post);

router.get("/login", auth_controller.login_get);
router.post("/login", auth_controller.login_post);

router.get("/logout", auth_controller.logout_get);

// message routes
const message_controller = require("../controllers/messageController");
router.get("/new_message", message_controller.new_message_get);
router.post("/new_message", message_controller.new_message_post);

module.exports = router;
