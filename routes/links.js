const express = require("express");
const router = express.Router();
const md5 = require("md5");
const Link = require("../database/Schema/shareLinkSchema.js");

/**
 * create link for sharing in DB and send as answer ro client
 */
router.get("/:nameHash", function(req, res) {
	if (req.user) {
		const fileid = req.user.ownFiles.findIndex(
			(element, index, array) => element.nameHash === req.params.nameHash
		);
		if (fileid !== -1) {
			Link.findOne(
				{ _id: md5(req.params.nameHash) },
				{ __v: 0 },
				(err, currentLink) => {
					if (currentLink) {
						currentLink.createdAt = Date.now();
						currentLink.save()
						res.send({
							status: "updated",
							link: currentLink._id,
							expires: 86400
						});
					} else {
						new Link({
							_id: md5(req.params.nameHash),
							sharedFile: req.user.ownFiles[fileid],
							createdAt:Date.now()
						})
							.save()
							.then(newLink => {
								res.send({
									status: "created",
									link: newLink._id,
									expires: 86400
								});
							});
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

/**
 * delete link in DB and send 200 status
 */
router.delete("/:nameHash", function(req, res) {
	if (req.user) {
		const fileid = req.user.ownFiles.findIndex(
			(element, index, array) => element.nameHash === req.params.nameHash
		);
		if (fileid !== -1) {
			Link.findOne(
				{ _id: md5(req.params.nameHash) },
				{ __v: 0 },
				(err, currentLink) => {
					if (currentLink) {
						Link.deleteOne({ _id: currentLink._id }, err =>{
							console.log(err)
						}
						).then(res.sendStatus(200))
						
						
					}
				}
			);
		} else {
			res.sendStatus(401);
		}
	} else {
		res.sendStatus(401);
	}
});
module.exports = router;
