const express = require("express");
const router = express.Router();
const md5 = require("md5");
const Image = require("../database/Schema/ImageSchema.js");
const multer = require("multer");
var storage = multer.memoryStorage();
const upload = multer({ storage: storage });
/**
 * send as answer Image
 */
router.get("/:Hash", function(req, res) {
	if (req.user) {
		Image.findOne({ _id: req.params.Hash }, { __v: 0 }, (err, currentImage) => {
			if (currentImage) {
				currentImage.createdAt = Date.now();
				currentImage.save();
				res.contentType(currentImage.img.contentType);
				res.send(currentImage.img.data);
			} else {
				res.sendStatus(204);
			}
		});
	} else {
		res.sendStatus(401);
	}
});

/**
 * create Image for sharing in DB and send as answer slug
 */
router.post("/", upload.single("file"), function(req, res) {
	if (req.user) {
		Image.findOne({ _id: req.params.Hash }, { __v: 0 }, (err, currentImage) => {
			if (err) console.log(1234);

			if (currentImage) {
				res.send(currentImage._id);
			} else {
				new Image({
					_id: md5(Date.now().toString() + req.user._id),
					img: { data: req.file.buffer, contentType: req.file.mimetype },
					createdAt: Date.now()
				})
					.save()
					.then(newImage => {
						res.send(newImage._id);
					});
			}
		});
	} else {
		res.sendStatus(401);
	}
});

/**
 * delete Image in DB and send 200 status
 */
router.delete("/:Hash", function(req, res) {
	if (req.user) {
		Link.deleteOne({ _id: req.params.Hash }, err => {
			if (err) {
				res.sendStatus(204);
			}
			res.sendStatus(200);
		});
	} else {
		res.sendStatus(401);
	}
});
module.exports = router;
