import mongoose from "mongoose";
import userSchema from "./userSchema";

const file = userSchema.file;

const link = new mongoose.Schema({
	_id: { type: String, required: true },
	sharedFile: file,
	createdAt: { type: Date, expires: 86400, default: Date.now }
});
const ShareLink = mongoose.model("link", link);

export default ShareLink;
