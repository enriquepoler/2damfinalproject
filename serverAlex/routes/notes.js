const express = require('express');
const crudNotes = require('../db/crudNotes');
let jwtAuth = require('../auth/authenticate')
let router = express.Router();

router.get('/', jwtAuth.authenticateJWT, jwtAuth.authorizeAlumne, (req, res)=>{
    const user = req.user;
    crudNot = new crudNotes();
    crudNot.getNotesFromUser(user.user_id, (err, result)=>{
        if(err){
            res.status(400).send({
                ok: false,
                error: err
            })
        } else {
            res.status(200).send({
                ok: true,
                data: result
            })
        }
    });
});

router.get('/:id', jwtAuth.authenticateJWT, jwtAuth.authorizeAlumne, (req, res)=>{
    crudNot = new crudNotes();
    crudNot.getNotesByFromAssig(req.params.id, req.user.user_id, (err, result)=>{
        if(err){
            res.status(400).send({
                ok: false,
                error: err
            })
        } else {
            res.status(200).send({
                ok: true,
                data: result
            })
        }
    });
})

module.exports = router;