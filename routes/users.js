const express = require('express');
const router = express.Router();
const db = require('../database/db');


/* GET users listing. */
router.get('/:id', function(req, res) {
    res.type('json');
    res.send(db.findUser(req.params.id).toJSON());
});

router.post('/', function(req, res) {
    db.createUser(req.body).then(res.sendStatus(200));
});

router.delete('/:id', function(req, res) {
    db.deleteUser(req.params.id).then(res.sendStatus(200));
});


module.exports = router;