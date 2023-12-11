var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

// user routes
const user_controller = require("../controllers/userController");
router.get("/register", user_controller.register_get);
router.post("/register", user_controller.register_post);

router.get("/login", user_controller.login_get);
router.post("/login", user_controller.login_post);

router.get("/logout", user_controller.logout_get);

module.exports = router;
