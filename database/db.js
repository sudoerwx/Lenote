const mongoose = require('mongoose');
const users = require('./Schema/userSchema');

export function setUPConnection() {
    mongoose.connect('mongodb://localhost/users');
}

export function deleteUser(id) {
    return users.remove({ googleId: id }, function (err) {});
}

export function createUser(data) {
    const user = new users({
        googleId: data.googleId,
        name: data.name,
        secondName: data.secondName,
        email: data.email,
        ownFiles: data.ownFiles,
        secondFiles: data.secondFiles
    });

    return user.save();
}

export function findUser(id) {
    return users.find({ googleId: id});
}