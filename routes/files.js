const express = require('express');
const router = express.Router();
const fs = require('fs');


router.get('/:id/:file', function(req, res) {
    fs.readFile(`../userfiles/${req.params.id}/${req.params.file}.md`, function (err, data) {
        if (err)
            res.sendStatus(404);
        if (data)
            res.send(data);
    });
});

router.post('/:id/:file', function(req, res) {
    fs.writeFile(`../userfiles/${req.params.id}/${req.params.file}.md`, req.body, function (err) {
        if (err) throw err;
        if(!err) res.sendStatus(200);
    });
});

router.delete('/:id/:file', function(req, res) {
    fs.unlink(`../userfiles/${req.params.id}/${req.params.file}.md`, function (err) {
        if (err) throw err;
        if(!err) res.sendStatus(200);
    });
});

module.exports = router;