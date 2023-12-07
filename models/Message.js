const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
	title: { type: String, required: true },
	message: { type: String, rquired: true, maxLength: 200 },
	date_created: { type: Date },
	user: { type: Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model("User", MessageSchema);
