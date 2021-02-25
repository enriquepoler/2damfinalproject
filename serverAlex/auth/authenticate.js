const jwt = require('jsonwebtoken');

const accessTokenSecret = '?;>+Z@^Jw{O~,2*h)TrV1$?0/t_lsb';
const refreshTokenSecret = '*g">j`{yX,D1UI7)laqbNEWzEr26HO';
const refreshTokens = [];

function authenticateJWT(req, res, next){
    // arrepleguem el JWT d'autorització
    const authHeader = req.headers.authorization;
    if (authHeader) { // si hi ha toquen
        // recuperem el jwt
        const token = authHeader.split(' ')[1]; jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) { // Token incorrecte
                return res.sendStatus(403); 
            }
    
            // afegim a la petició les dades que venien en el jwt user
            req.user = user;
            // s'executa la segïuent funció, un cop s'ha fet el middleware
            next();
        });
    } else { // no està. contestem directament al client amb un error 401 (unauthorized)
            res.sendStatus(401);
        }
};

function authorizeAlumne(req, res, next){
    if(req.user.role == 'alumne'){
        next()
    } else {
        return res.sendStatus(403); 
    }
}

function authorizeProfe(req, res, next){
    if(req.user.role == 'profe'){
        next()
    } else {
        return res.sendStatus(403); 
    }
}

module.exports = {accessTokenSecret, refreshTokenSecret, refreshTokens, authenticateJWT, authorizeAlumne, authorizeProfe, jwt}