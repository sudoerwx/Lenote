const express = require("express");
const router = express.Router();
const users = require("../database/Schema/userSchema.js");
/* GET users listing. */
router.get("/", function(req, res) {
	if (req.user) {
		res.send(req.user);
	} else {
		res.sendStatus(401);
	}
});

router.delete("/", function(req, res) {
	if (req.user) {
		users.deleteOne({ _id: req.user._id }, err => callback(err));
	} else {
		res.sendStatus(401);
	}
});
module.exports = router;
