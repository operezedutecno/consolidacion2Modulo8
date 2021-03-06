const express = require('express');
const {nuevaBoleta, listarboleta, modificarboletas, eliminarBoletas, nuevoCliente, listarClientes, modificarClientes, eliminarClientes } = require('./consultas');
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


//Registrar Clientes
app.post("/clientes", async (req,res)=>{
    const cliente = req.body
    const respuesta = await nuevoCliente(cliente)
    res.send(respuesta)
});

//Consultar Clientes
app.get("/clientes", async (req, res) =>{
    const resultado = await listarClientes( )
    res.send(resultado)
})

//Editar Clientes
app.put("/clientes/:id", async (req,res) =>{
    let id = req.params.id
    const cliente = req.body
    const resultado = await modificarClientes(id, cliente)
    res.send(resultado)
})

//Eliminar clientes
app.delete("/clientes/:id", async (req,res) =>{
    let id = req.params.id
    const resultado = await eliminarClientes(id)
    res.send(resultado)
})
