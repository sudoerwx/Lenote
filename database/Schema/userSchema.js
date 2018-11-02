const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: {type:Number, required: true},
    name: String,
    secondName: String,
    email: String,
    photoURI:String,
    ownFiles: Array,
    secondFiles: Array
});
const User = mongoose.model('user',userSchema);

module.exports = User;