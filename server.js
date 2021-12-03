const express = require('express')
const cookieParser = require('cookie-parser')
const cookiesMaker = require('./router/cookiesMaker');
const session = require('./router/session');

// const bodyParser = require('body-parser');
const app = express();

const { Router } = express;
const router = Router();


//Tiene que tener una de las dos, no ambas
// app.use(cookieParser());
app.use(cookieParser('my-secret'));
app.use(express.json())

// app.use((req,res,next) => {
//     console.dir(req.cookies);
//     console.dir(req.signedCookies);
//     next()
// })

app.get('/', (req , res) => {
    res.send('Bienvenido al servidor del más capito')
})

app.get('/set',( req , res ) => {
    res.cookie('server','express').send('Cookie Set');
});

app.get('/setEx', ( req , res ) => {
    res.cookie( 'Expira en 3 s' , 'cookie_expirable' , { maxAge : 3000 } ).send('Cookie SetEx'); 
})

app.get('/get', (req , res) => {
    res.send(req.cookies.server);
})

app.get('/clear', (req , res) => {
    // res.clearCookie('server').send('cookie Clear');
    for (const cookieName of Object.keys(req.cookies)) {
        res.clearCookie(cookieName)
    }
    for ( const signedCookieName of Object.keys(req.signedCookies)){
        res.clearCookie(signedCookieName)
    }
    res.send('Clear Cookies')
})
///JSON COOKIE

app.get('/setJSON', (req , res) => {
    res.cookie('json',{ tipo : 'cookie', nombre: 'cuqui'})
        .send('Set Json Cookie');
})

//SIGNED COOKIE

app.get('/setsIGNED', (req , res) => {
    res.cookie('signed', 'cookie' , { signed : true})
        .send('Set Signed Cookie');
})

app.get('/get/:nombre', (req , res) => {
    const cookieName = req.params.nombre;
    const jsonCookie = req.cookies[cookieName];
    res.json(jsonCookie)
})

app.use('/cookies', cookiesMaker);
app.use('/session', session);


const PORT = 8080 ; 

app.listen(PORT, ()=>{
    console.log(`El servidor se conecto al puerto: ${PORT}`);
})