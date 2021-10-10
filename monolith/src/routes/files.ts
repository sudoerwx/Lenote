import express from "express";
import md5 from "md5";
import websockets from "../sockets/websockets";
import User from "../database/Schema/userSchema";

const router = express.Router();
/**
 * create file and  send all user file
 */
router.post("/:file", function(req, res) {
	if (req.user) {
		User.findById(req.user._id, (err, user) => {
			user.ownFiles.push({
				name: req.params.file,
				nameHash: md5(req.params.file + user._id),
				ownerId: user._id,
				ownerName: user.name.givenName,
				allowedPeople: []
			});
			user.save();

			websockets.createFile(user.ownFiles[user.ownFiles.length - 1].nameHash);

			res.send(user.ownFiles[user.ownFiles.length - 1].nameHash);
		});
	} else {
		res.sendStatus(401);
	}
});

/**
 * delete file and send 200 code
 */
router.delete("/:file", function(req, res) {
	if (req.user) {
		User.findById(req.user._id, (err, user) => {
			let ownFileIndex = user.ownFiles.findIndex(element =>
				element.nameHash.localeCompare(req.params.file) === 0 ? true : false
			);
			let ownfile = user.ownFiles[ownFileIndex];
			let ownfileid = ownfile && ownfile.nameHash;
			let secondFileIndex = user.secondFiles.findIndex(element =>
				element.nameHash.localeCompare(req.params.file) === 0 ? true : false
			);
			let secondfile = user.secondFiles[secondFileIndex];

			let secondfileid = secondfile && secondfile.nameHash;
			if (!ownfileid && !secondfileid) return;

			if (ownfileid) {
				user.ownFiles[ownFileIndex].allowedPeople.forEach(element => {
					User.findById(element, (err, allowedUser) => {
						allowedUser.secondFiles.forEach((file, i) => {
							if (file.nameHash.localeCompare(ownfileid) === 0 ? true : false) {
								allowedUser.secondFiles.splice(i, 1);
							}
						});

						allowedUser.save();
					});
				});
				websockets.deleteFile(ownfileid);
				user.ownFiles.splice(ownFileIndex, 1);
			} else {
				let x = 1;
				User.findById(
					user.secondFiles[secondFileIndex].ownerId,
					(err, owner) => {
						owner.ownFiles.forEach((file, i) => {
							if (
								file.nameHash.localeCompare(secondfileid) === 0 ? true : false
							) {
								owner.ownFiles[i].allowedPeople.forEach(
									(element, peopleIndex) => {
										if (element === user._id) {
											owner.ownFiles[i].allowedPeople.splice(peopleIndex, 1);
										}
									}
								);
							}
						});

						owner.save();
					}
				);

				user.secondFiles.splice(secondFileIndex, 1);
			}
			user.save();
			res.sendStatus(200);
		});
	} else {
		res.sendStatus(401);
	}
});
export default router;
