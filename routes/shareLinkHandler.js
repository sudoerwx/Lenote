const express = require("express");
const router = express.Router();
const md5 = require("md5");
const User = require("../database/Schema/userSchema.js");
const Link = require("../database/Schema/shareLinkSchema.js");
router.get("/:nameHash", function(req, res) {
	if (req.user) {
		const fileid = req.user.secondFiles.findIndex(
			(element, index, array) => element.nameHash === req.params.nameHash
		);
		if (fileid === -1) {
			Link.findOne(
				{ _id: md5(req.params.nameHash) },
				{ __v: 0 },
				(err, currentLink) => {
					if (currentLink) {
						 User.findById(req.user._id, (err, user) => {
      user.secondFiles.push(currentLink.sharedFile)
      user.save()
    });
						 res.sendStatus(200)
						
					
					}
				}
			);
		} else {
			res.sendStatus(204);
		}
	} else {
		res.sendStatus(401);
	}
});

module.exports = router;
