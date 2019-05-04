const mongoose = require("mongoose");

const image = new mongoose.Schema({
	_id: { type: String, required: true },
	img: { data: Buffer, contentType: String },
	createdAt: { type: Date, expires: 2592000, default: Date.now }
});
const Image = mongoose.model("image", image);

module.exports = Image;
