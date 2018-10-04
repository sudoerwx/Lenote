const express = require('express');
const router = express.Router();
const db = require('../database/db');


/* GET users listing. */
router.get('/:id', function(req, res) {
   // db.findUser(req.params.id).then(console.log);
    db.findUser(req.params.id,err=>res.sendStatus(err))
        .then(response => res.send(response));
});

router.post('/', function(req, res) {
    db.createUser(req.body,err=>{
        if(err)res.sendStatus(500);
        else
            res.sendStatus(200);
    });
});

router.delete('/:id', function(req, res) {
    db.deleteUser(req.params.id,err=>{
        if(err)res.sendStatus(500);
        else
            res.sendStatus(200);
    });
});


module.exports = router;