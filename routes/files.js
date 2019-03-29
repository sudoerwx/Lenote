const express = require('express')
const router = express.Router()
const md5 = require('md5')
const websockets = require('../sockets/websockets.js')
const User = require('../database/Schema/userSchema.js')

router.post('/:file', function(req, res) {
	if (req.user) {
		const a = User.findById(req.user._id, (err, user) => {
			user.ownFiles.push({
				name: req.params.file,
				nameHash: md5(req.params.file + user.id),
				ownerId: user.id,
				ownerName: user.name.givenName,
				allowedPeople: [],
			})
			user.save()
			/* .then(user => { */
			websockets.createFile(user.ownFiles[user.ownFiles.length - 1].nameHash)
			/* }) */
			res.send(user.ownFiles)
		}) /* .save() */
		console.log(a)
	} else {
		res.sendStatus(401)
	}
})

router.delete('/:file', function(req, res) {
	if (req.user) {
		User.findById(req.user._id, (err, user) => {
			let ownfile =
				user.ownFiles[user.ownFiles.findIndex((element, index, array) => element.nameHash === req.params.file)]
			let ownfileid = ownfile && ownfile.nameHash
			let secondfile =
				user.secondFiles[
					user.secondFiles.findIndex((element, index, array) => element.nameHash === req.params.file)
				]
			let secondfileid = secondfile && secondfile.nameHash
			if (!ownfileid && !secondfileid) return

			websockets.deleteFile(ownfileid ? ownfileid : secondfileid)

			if (ownfileid) {
				user.ownFiles.splice(
					user.ownFiles.findIndex((element, index, array) => element.nameHash === req.params.file),
					1
				)
			} else {
				user.secondFiles.splice(
					user.secondFiles.findIndex((element, index, array) => element.nameHash === req.params.file),
					1
				)
			}
			user.save()
			res.sendStatus(200)
		})
	} else {
		res.sendStatus(401)
	}
})

module.exports = router
