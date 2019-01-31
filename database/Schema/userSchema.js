const mongoose = require("mongoose");
const allowedPerson = new mongoose.Schema(
  {
    id: String,
    name: String
  },
  { _id: false }
);
const file = new mongoose.Schema(
  {
    name: String,
    nameHash: String,
    ownerId: String,
    ownerName: String,
    allowedPeople: [allowedPerson]
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
const link = new mongoose.Schema(
  {
    address: String,
    sharedFile: file,
    createdAt: { type: Date, expires: 86400, default: Date.now }
  },
  { _id: false }
);
const User = mongoose.model("user", userSchema);

exports = module.exports = User;
exports.file = file;
