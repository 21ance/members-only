const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
	title: { type: String, required: true },
	message: { type: String, required: true, minLength: 1, maxLength: 200 },
	date_created: { type: Date },
	user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Message", MessageSchema);
