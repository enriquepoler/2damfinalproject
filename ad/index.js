const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const accessTokenSecret = "paraulasupersecreta"
const crudAlumne = require('./db/crudAlumne')
const crudProfessor = require('./db/crudProfessor')
const crudUser = require('./db/crudUser')
const Alumne = require('./models/alumne')
const Professor = require('./models/professor')
const User = require('./models/user')
const { CrudUser } = require('./db/crudUser')

const authenticateJWT = (req, res, next) => {
    // arrepleguem el JWT d'autorització
    const authHeader = req.headers.authorization;
    if (authHeader) { // si hi ha toquen
        // recuperem el jwt
        const token = authHeader.split(' ')[1];
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            // afegim a la petició les dades que venien en el jwt user
            req.user = user;
            // s'executa la segïuent funció, un cop s'ha fet el middleware
            next();
        });
    } else { // no està. contestem directament al client amb un error
        401(unauthorized)
        res.sendStatus(401);
    }
};

let app = express();

app.use(bodyParser.json())

app.listen(8080);

app.post('/contactos', (req, res) => {
    Contacto.find().then(resultado => {
        res.status(200).send({ ok: true, resultado: resultado });

    }).catch(error => {
        res.status(500).send({
            ok: false, error: error
        })
    })
})

app.get('/contactos/:id', (req, res) => {
    Contacto.findById(req.params.id).then(resultado => {
        if (resultado)
            res.status(200)
                .send({ ok: true, resultado: resultado });
        else
            res.status(400)
                .send({
                    ok: false,
                    error: "No se han encontrado contactos"
                });
    }).catch(error => {
        res.status(500)
            .send({
                ok: false,
                error: "Error buscando el contacto indicado"
            });
    });
});

app.post('/register', (req, res) => {
    if(req.body.username)
    let user = new User(
        req.body.username,
        req.body.password,
        req.body.full_name,
        req.body.avatar
    );
    CrudUser.insertUser(user).then(resultado => {
        res.status(200).send({ ok: true, resultado: resultado });
    }).catch(error => {
        res.status(400)
            .send({
                ok: false,
                error: "Error añadiendo usuario"
            });
    });

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