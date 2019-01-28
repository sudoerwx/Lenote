const express = require('express');
const router = express.Router();
const passport = require('passport');

// google login landler
router.get(
    '/google',
    passport.authenticate('google', {scope: ['profile', 'email']})
);
// google login callback
router.get(
    '/google/callback',
    passport.authenticate('google', {successRedirect: '/',failureRedirect: '/auth/google'}),

);

module.exports = router;
