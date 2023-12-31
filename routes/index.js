var express = require("express");
var router = express.Router();

// authentication routes
const auth_controller = require("../controllers/authController");
router.get("/register", auth_controller.register_get);
router.post("/register", auth_controller.register_post);

router.get("/login", auth_controller.login_get);
router.post("/login", auth_controller.login_post);

router.get("/logout", auth_controller.logout_get);

// message routes
const message_controller = require("../controllers/messageController");

// homepage
router.get("/", message_controller.index);

router.get("/new_message", message_controller.new_message_get);
router.post("/new_message", message_controller.new_message_post);

router.post("/:message/delete", message_controller.delete_message_post);

// member routes
const user_controller = require("../controllers/userController");
router.get("/membership", user_controller.membership_get);

router.post("/membership", user_controller.membership_post);

module.exports = router;
