var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res) {
    res.send(req.params.id);
});

router.post('/', function(req, res) {
    res.send('post');
});

router.delete('/:id', function(req, res) {
    res.send(req.params.id);
});

module.exports = router;