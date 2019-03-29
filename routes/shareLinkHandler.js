const express = require("express");
const router = express.Router();
const md5 = require("md5");
const User = require("../database/Schema/userSchema.js");
const Link = require("../database/Schema/shareLinkSchema.js");
router.get("/:nameHash", function(req, res) {
  if (req.user) {
    Link.findById(req.params.nameHash, (err, currentLink) => {
      if (currentLink) {
        const secondfileid = req.user.secondFiles.findIndex(
          (element, index, array) =>
            element.nameHash === currentLink.sharedFile.nameHash
        );

        const ownfileid = req.user.ownFiles.findIndex(
          (element, index, array) =>
            element.nameHash === currentLink.sharedFile.nameHash
        );

        if (secondfileid === -1 && ownfileid === -1) {
          User.findById(req.user._id, (err, user) => {
            user.secondFiles.push(currentLink.sharedFile);
            user.save();
          });

          res.sendStatus(200);
        } else {
          res.sendStatus(204);
        }
      } else {
        res.sendStatus(404);
      }
    });
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
