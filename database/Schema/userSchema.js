const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    googleId: {type:Number, required: true},
    name: String,
    secondName: String,
    email: String,
    ownFiles: Array,
    secondFiles: Array
});
const User = mongoose.model('user',userSchema);

module.exports = User;