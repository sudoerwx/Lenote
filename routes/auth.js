const express = require("express");
const router = express.Router();
const passport = require("passport");

/**
 * google login handler and redirect to google OAuth2
 */
router.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

/**
 * google login callback and redirect to home page
 */
router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.NODE_ENV ? "/" : "http://localhost:3000/",
		failureRedirect: "/auth/google"
	})
);

/**
 * google logout handler and redirect to home page
 */
router.get("/logout", function(req, res) {
	req.logout();
	res.redirect(process.env.NODE_ENV ? "/" : "http://localhost:3000/");
});

module.exports = router;
