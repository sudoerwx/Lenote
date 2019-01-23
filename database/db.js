const mongoose = require("mongoose");
const users = require("./Schema/userSchema");
const keys = require("../config/keys");


export function setUPConnection() {
    mongoose.connect(
        keys.mongodb.dbURI,
        { useNewUrlParser: true }
    );
}

export function deleteUser(id, callback) {
    return users.deleteOne({ _id: id }, err => callback(err));
}
/*
export function createUser(data,callback) {
    const user = new users({
        googleId: data.googleId,
        name: data.name,
        secondName: data.secondName,
        email: data.email,
        photoURI:data.photoUri,
        ownFiles: data.ownFiles,
        secondFiles: data.secondFiles
    });

    return user.save(err=>callback(err));
}*/

export const findUser = (id, callback) =>
    new Promise(resolve => {
        users.findOne({ _id: id }, { __v: 0 }, function(err, test) {
            if (err) callback(500);
            if (test == null) callback(404);
            else resolve(test);
        });
    });