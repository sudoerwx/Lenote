const express = require('express');
const router = express.Router();
const db = require('../database/db');


/* GET users listing. */
router.get('/:id', function(req, res) {
    res.send(req.params.id);
});

router.post('/', function(req, res) {
    res.send('post');
});

router.delete('/:id', function(req, res) {
    db.deleteUser(req.params.id).then(res.sendStatus(200));
});


module.exports = router;