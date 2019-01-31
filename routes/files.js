const express = require("express");
const router = express.Router();
const md5 = require("md5");
const websockets = require("../sockets/websockets.js");
const User = require("../database/Schema/userSchema.js");

router.post("/:file", function(req, res) {
  if (req.user) {
    User.findById(req.user._id, (err, user) => {
      user.ownFiles
        .push({
          name: req.params.file,
          nameHash: md5(req.params.file + user.id),
          ownerId: user.id,
          ownerName: user.name.givenName,
          allowedPeople: []
        })
        .save()
        .then(user => {
          websockets.createFile(
            user.ownFiles[user.ownFiles.length - 1].nameHash
          );
        });
    });
  } else {
    res.sendStatus(401);
  }
});

router.delete("/:file", function(req, res) {
  if (req.user) {
    User.findById(req.user._id, (err, user) => {
      websockets
        .deleteFile(
          user.ownFiles[
            user.ownFiles.findIndex(
              (element, index, array) => element.nameHash === req.params.file
            )
          ].nameHash
        )
        .then(err => {
          if (!err)
            user.ownFiles
              .splice(
                user.ownFiles.findIndex(
                  (element, index, array) =>
                    element.nameHash === req.params.file
                ),
                1
              )
              .save();
        });
    });
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
