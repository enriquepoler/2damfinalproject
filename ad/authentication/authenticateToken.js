const jwt = require('jsonwebtoken');
const accessTokenSecret = 'paraulaTopSecret'
const refreshTokenSecret = 'laMateixaDeSempre'
const refreshTokens = []

function authenticateJWT(req, res, next){
    
    const authHeader = req.headers.authorization;
    if (authHeader) { 
        
        const token = authHeader.split(' ')[1]; jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) { 
                return res.sendStatus(403); 
            }
    
            req.user = user;
            next();
        });
    } else {
            res.sendStatus(401);
        }
}

function authenticateProfe(req, res, next){
    if(req.user.role == 'profe'){
        next()
    } else {
        return res.sendStatus(403); 
    }
}

function authenticateAlu(req, res, next){
    if(req.user.role == 'alumne'){
        next()
    } else {
        return res.sendStatus(403); 
    }
}



module.exports = {accessTokenSecret, refreshTokenSecret, refreshTokens, authenticateJWT, authenticateProfe, authenticateAlu, jwt}