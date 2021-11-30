const express = require('express')

const app = expres();

const PORT = 8080 ;

const usuarios = [];

app.get('/',( req , res ) => {

})

app.post('/register', ( req , res ) => {
    const { name , password , direccion } = req.body;

    
    usuarios.push(newUser);
    res.send(`Se ha creado un nuevo usuario: ${newUser}`)
})

app.listen(PORT, ()=>{
    console.log(`El servidor se conecto al puerto: ${PORT}`);
})