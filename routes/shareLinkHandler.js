const express = require("express");
const router = express.Router();
const md5 = require("md5");
const User = require("../database/Schema/userSchema.js");
const Link = require("../database/Schema/shareLinkSchema.js");
router.get("/:nameHash", function(req, res) {
  if (req.user) {
    Link.findById(req.params.nameHash, (err, currentLink) => {
      if (currentLink) {
        const secondfileid = req.user.secondFiles.findIndex((element, index, array) =>
          element.nameHash.localeCompare(currentLink.sharedFile.nameHash) === 0 ? true : false
        );

        const ownfileid = req.user.ownFiles.findIndex((element, index, array) =>
          element.nameHash.localeCompare(currentLink.sharedFile.nameHash) === 0 ? true : false
        );

        if (secondfileid === -1 && ownfileid === -1) {
          User.findById(req.user._id, (err, user) => {
            currentLink.sharedFile.allowedPeople.push(user._id);
            user.secondFiles.push(currentLink.sharedFile);

            User.findById(currentLink.sharedFile.ownerId, (err, owner) => {
              owner.ownFiles.forEach((element, index, array) => {
                if (element.nameHash.localeCompare(currentLink.sharedFile.nameHash) === 0 ? true : false) {
                  owner.ownFiles[index].allowedPeople.push(user._id);
                }
              });

              owner.save();
            });

            user.save();
          });

          Link.deleteOne({ _id: currentLink._id }, err => {
            if (err) {
              throw err;
            }
          });
        }
      }
    });
  }
  res.redirect(process.env.NODE_ENV ? "http://lenote.herokuapp.com/" : "http://localhost:3000/");
});

module.exports = router;
