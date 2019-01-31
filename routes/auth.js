const express = require("express");
const router = express.Router();
const passport = require("passport");

// google login landler
router.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);
// google login callback
router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.NODE_ENV ? "/" : "http://localhost:3000/",
		failureRedirect: "/auth/google"
	})
);

router.get("/logout", function(req, res) {
	req.logout();
	res.redirect(process.env.NODE_ENV ? "/" : "http://localhost:3000/");
});

module.exports = router;
