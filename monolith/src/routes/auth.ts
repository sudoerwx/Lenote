import express from 'express';
import { googleLogin, googleCallback } from '../controllers/auth';
const router = express.Router();

/**
 * google login handler and redirect to google OAuth2
 */
router.get('/google', googleLogin);

/**
 * google login callback and redirect to home page
 */
router.get('/google/callback', googleCallback);

/**
 * google logout handler and redirect to home page
 */
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect(process.env.NODE_ENV ? '/' : 'http://localhost:3000/');
});

export default router;
