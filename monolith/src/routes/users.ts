import express from 'express';
import users from '../models/Schema/userSchema';

const router = express.Router();

/**
 * find user data in DB and send as answer
 */
router.get('/', function (req, res) {
  if (req.user) {
    res.send(req.user);
  } else {
    res.sendStatus(401);
  }
});

/**
 * delete user and send 200 status
 */
router.delete('/', function (req, res) {
  if (req.user) {
    users.deleteOne({ _id: req.user._id }, (err) => res.sendStatus(500));
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

export default router;
