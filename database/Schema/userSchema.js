const mongoose = require("mongoose");
const file = new mongoose.Schema(
	{
		name: String,
		nameHash: String,
		ownerId: String,
		ownerName: String,
		allowedPeople: [String]
	},
	{ _id: false }
);
const userSchema = new mongoose.Schema({
	_id: { type: String, required: true },
	name: String,
	secondName: String,
	email: String,
	photoURI: String,
	ownFiles: [file],
	secondFiles: [file]
});

const User = mongoose.model("user", userSchema);

exports = module.exports = User;
exports.file = file;
