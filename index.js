const express = require('express');
const {nuevaBoleta, listarboleta, modificarboletas, eliminarBoletas } = require('./consultas');
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

//Consultar Boletas
app.get("/boletas", async (req, res) =>{
    const resultado = await listarboleta( )
    res.send(resultado)
})

//Editar boletas
app.put("/boletas/:id", async (req,res) =>{
    let id = req.params.id
    const boleta = req.body
    const resultado = await modificarboletas(id,boleta)
    res.send(resultado)
})

//Eliminar boletas
app.delete("/boletas/:id", async (req,res) =>{
    let id = req.params.id
    const resultado = await eliminarBoletas(id)
    res.send(resultado)
})
