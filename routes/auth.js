const express = require('express');
const router = express.Router();
const db = require('../database/db');
const passport = require('passport');

router.get('/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    //res.redirect('//localhost:3000');
        res.send(req.user);
  });

module.exports = router;