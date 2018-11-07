const express = require("express");
const router = express.Router();
const db = require("../database/db");

/* GET users listing. */
router.get("/", function(req, res) {
    // db.findUser(req.params.id).then(console.log);
    if (req.user) {
        res.send(req.user);
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;