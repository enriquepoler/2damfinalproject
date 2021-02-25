const express = require('express');
const crudNotes = require('../db/crudNotes');
const crudAssignatures = require('../db/crudAssignatures')
let jwtAuth = require('../auth/authenticate')
let router = express.Router();

router.get('/', jwtAuth.authenticateJWT, jwtAuth.authorizeProfe, (req, res)=>{
    crudAssig = new crudAssignatures();
    crudAssig.getProfesAssigs(req.user.user_id, (err, result)=>{
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

router.get('/:id', jwtAuth.authenticateJWT, jwtAuth.authorizeProfe, (req, res)=>{
    crudNot = new crudNotes();
    crudNot.getNotesByAssigAndProfeId(req.params.id, req.user.user_id, (err, result)=>{
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

router.put('/:id_assig/:id_alu', jwtAuth.authenticateJWT, jwtAuth.authorizeProfe, (req, res)=>{
    crudNot = new crudNotes();
    crudNot.setNotesToAlu(req.params.id_assig, req.params.id_alu, req.user.user_id, req.body.nota, (err, changes)=>{
        if(err){
            res.status(400).send({
                ok: false,
                error: err
            })
        } else {
            res.status(200).send({
                ok: changes.affectedRows > 0,
            })
        }
    })
})

module.exports = router;