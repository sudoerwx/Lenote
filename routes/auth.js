const express = require('express')
const router = express.Router()
const passport = require('passport')

// google login landler
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
// google login callback
console.log(process.env.NODE_ENV)
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
	// Successful authentication, redirect home.
	/* res.redirect('http:/localhost:3000') */
	res.writeHead(302, {
		Location: process.env.NODE_ENV ? '/' : 'http://localhost:3000',
	})
	res.end()
})

module.exports = router
