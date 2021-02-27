const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const crudAlumne = require('./db/crudAlumne')
const crudProfessor = require('./db/crudProfessor')
const crudUser = require('./db/crudUser')
const Alumne = require('./models/alumne')
const Professor = require('./models/professor')
const User = require('./models/user')
const { CrudUser } = require('./db/crudUser')
const { CrudProfessor } = require('./db/crudProfessor')
const accessTokenSecret = 'paraulasupersecreta'
const refreshTokenSecret = 'laMateixaDeSempre'

const authenticateJWT = (req, res, next) => {
    // arrepleguem el JWT d'autorització
    const authHeader = req.headers.authorization;
    if (authHeader) { // si hi ha toquen
        // recuperem el jwt
        const token = authHeader.split(' ')[1]
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            // afegim a la petició les dades que venien en el jwt user
            req.user = user;
            // s'executa la segïuent funció, un cop s'ha fet el middleware
            next()
        })
    } else { // no està. contestem directament al client amb un error 401(unauthorized)
        res.sendStatus(401);
    }
}

function authenticateProfe(req, res, next){
    if(req.user.role == 'profe'){
        next()
    } else {
        return res.sendStatus(403)
    }
}

function authenticateAlu(req, res, next){
    if(req.user.role == 'alumne'){
        next()
    } else {
        return res.sendStatus(403) 
    }
}

let app = express();

app.use(bodyParser.json())

app.listen(8080);

app.post('/register', (req, res) => {
    if (req.body.username != "" & req.body.password != "" & req.body.full_name != "" & req.body.dni != "") {

        let user = new User.User(
            req.body.username,
            req.body.password,
            req.body.full_name,
            req.body.avatar
        );
        CrudUser.insertUser(user, (error, resultado) => {
            if (error) {
                res.status(400)
                    .send({
                        ok: false,
                        error: "Error añadiendo usuario: " + error
                    });
            } else {
                console.log(resultado)
                if (CrudProfessor.isProfessor(req.body.dni) == 1) {
                    let profe = new Professor(resultado.id, req.body.dept)
                    CrudProfessor.insertProfessor(profe)
                }
                res.status(200).send({ ok: true, resultado: resultado })
            }

        })
    }else{
        res.status(403).send({
            ok: false,
            error: "Error, los campos no son validos"
        })
    }
    

});

app.put('/contactos/:id', (req, res) => {
    Contacto.findByIdAndUpdate(req.params.id, {
        $set: {
            nombre: req.body.nombre,
            telefono: req.body.telefono,
            edad: req.body.edad
        }
    }, { new: true }).then(resultado => {
        res.status(200)
            .send({ ok: true, resultado: resultado });
    }).catch(error => {
        res.status(400)
            .send({
                ok: false,
                error: "Error actualizando contacto"
            });
    });
});

app.delete('/contactos/:id', (req, res) => {
    Contacto.findByIdAndRemove(req.params.id)
        .then(resultado => {
            res.status(200)
                .send({ ok: true, resultado: resultado });
        }).catch(error => {
            res.status(400)
                .send({
                    ok: false,
                    error: "Error eliminando contacto"
                });
        });
});