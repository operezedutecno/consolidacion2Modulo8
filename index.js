const express = require('express');
const {nuevaBoleta} = require('./consultas');
const app = express();

//body parser con express
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//Levantamos servidor
app.listen(3000,(req,res)=>console.log("ejecutando por puerto http://localhost:3000"));

//Registrar nueva boleta
app.post("/boletas", async (req,res)=>{
    const boleta = req.body
    const respuesta = await nuevaBoleta(boleta)
    res.send(respuesta)
});