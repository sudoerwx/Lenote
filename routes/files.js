const express = require('express');
const router = express.Router();
const fs = require('fs');
const fse = require('fs-extra');
const path = process.cwd();

router.get('/:file', function(req, res) {
    fs.readFile(`${path}/userfiles/${req.user._id}/${req.params.file}.md`,"utf8", function (err, data) {
        if (err)
            res.sendStatus(404);
        if (data)
            res.send(data);
    });
});

router.post('/:file', function(req, res) {
    fse.ensureDir(`${path}/userfiles/${req.user._id}/`, err => {
        console.log(err) // => null
        // dir has now been created
    });
    fs.writeFile(`${path}/userfiles/${req.user._id}/${req.params.file}.md`, req.body, function (err) {
        if (err) res.sendStatus(500);
        if(!err) res.sendStatus(200);
        console.log(req.body);
    });
});

router.delete('/:file', function(req, res) {
    fs.unlink(`${path}/userfiles/${req.user._id}/${req.params.file}.md`, function (err) {
        if (err) res.sendStatus(404);
        if(!err) res.sendStatus(200);
    });
});

module.exports = router;
