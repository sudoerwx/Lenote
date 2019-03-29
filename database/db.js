const mongoose = require("mongoose");
const users = require("./Schema/userSchema");
const keys = require("../config/keys");

/**
 * setup mongoose connection
 */
export function setUPConnection() {
  mongoose.connect(keys.mongodb.dbURI, {
    useCreateIndex: true,
    useNewUrlParser: true
  });
}
