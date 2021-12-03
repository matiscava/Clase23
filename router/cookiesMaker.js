const { json } = require('body-parser');
const express = require('express');
const cookieRouter = express.Router();

cookieRouter.get('/', ( req,res ) => {
   res.json({ signed: req.signedCookies, normales: req.cookies})
})

cookieRouter.post('/', ( req, res ) => {
    const cookieObject = req.body;
    const {name , value , duration} = cookieObject;
    console.log(name,value,duration);
    if (!cookieObject) {
       return res.json({error: 'No se ingreso ningun valor'});
    } 
    if (!name || !value){
        return res.json({error: 'falta nombre ó valor'});
    } 
    if (!duration || isNaN(duration)){
        res.cookie(name, value)
    }else{
        res.cookie(name,value,{maxAge: parseInt(duration)})
    }
        res.json({proceso:'ok'})
})

cookieRouter.delete('/cookies/:nombre', (req, res) => {
    const { nombre } = req.params
    if (nombre) {
      res.clearCookie(nombre)
      res.json({ proceso: 'ok' })
    } else {
      res.json({ error: 'falta nombre' })
    }
  })

module.exports = cookieRouter;