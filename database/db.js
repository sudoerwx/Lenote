const mongoose = require('mongoose');
const users = require('./Schema/userSchema');

export function setUPConnection() {
    mongoose.connect('mongodb://test:test_pass_1234@ds121343.mlab.com:21343/lenote-users',{ useNewUrlParser: true });
    }

export function deleteUser(id,callback) {
    return users.deleteOne({ _id: id },err=>callback(err));
}

export function createUser(data,callback) {
    const user = new users({
        _id: data.googleId,
        name: data.name,
        secondName: data.secondName,
        email: data.email,
        ownFiles: data.ownFiles,
        secondFiles: data.secondFiles
    });

    return user.save(err=>callback(err));
}

export const findUser = (id,callback) => new Promise(resolve => {
    users.findOne({_id:id},{__v:0}, function (err, test) {
        if(err) callback(500);
        if(test==null)
            callback(404);
        else
            resolve(test);
    })
})