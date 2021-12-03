const express = require('express');
const session = require('express-session');
const sessionRouter = express.Router();

sessionRouter.use(express.json())
sessionRouter.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true
}))

function auth( req , res , next ){
    if ((req.session && req.session.user === 'mati') && (req.session && req.session.admin)) {
        return next();
    }
    return res.status(401).send('error de autorización!');
}

sessionRouter.get('/', (req, res) => {
    res.send('bienvenido a la session')
})

sessionRouter.get('/con-session', (req, res) => {
    if(req.session.contador) {
        req.session.contador++;
        res.send(`Ud ha visitado el sitio ${req.session.contador} veces.`)
    }else{
        req.session.contador=1;
        res.send('Bienvenido')
    }
})

sessionRouter.get('/logout' , (req,res) => {
    req.session.destroy( error => {
        if(!error) res.send('Logout Ok!')
        else res.send({status: 'Logout ERROR', body: error})
    })
})

sessionRouter.get( '/login' , (req , res) => {
    const { username , password } = req.query;

    if (username !== 'mati' || password !== 'scava') {
        return res.send('login failed');
    }
    req.session.user = username;
    req.session.admin = true;
    res.send('login success!');
})

sessionRouter.get( '/privado' , auth , (req , res) => {
    res.send('Si estas viendo esto es porque ya te logueasteSS')
})

sessionRouter.get('/logout', (req,res) => {
    req.session.destroy( error => {
        if (error) {
            return res.json({ status : 'Logout ERROR'})
        }
        res.send(' Logout ok! ')
    })
})

module.exports = sessionRouter;