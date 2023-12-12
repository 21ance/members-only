const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const MessageSchema = new Schema({
	title: { type: String, required: true },
	message: { type: String, required: true, minLength: 1, maxLength: 200 },
	date_created: { type: Date },
	user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

MessageSchema.virtual("date_created_formatted").get(function () {
	return DateTime.fromJSDate(this.date_created).toLocaleString(
		DateTime.DATETIME_MED
	);
});

module.exports = mongoose.model("Message", MessageSchema);
