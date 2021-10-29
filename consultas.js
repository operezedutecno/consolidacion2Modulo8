const { Pool } = require('pg');

//Config Pool
const pool = new Pool({
    user: 'postgres',
    password:'postgres',
    database:'ventas',
    host:'localhost',
    port:'5432',
    min: 2,
    max: 20
});

//Acciones para conectar a BD

let nuevaBoleta = async (boleta) => {
    try {
        let consulta = {
            text: 'INSERT INTO boletas(id_cliente,fecha) VALUES ($1,$2) RETURNING *',
            values: [boleta.id_cliente,boleta.fecha]
        }
        let resp = await pool.query(consulta)
        return resp.rows
        
    } catch (error) {
        if (error.code == '23503' && error.constraint == 'boletas_id_cliente_fkey') {
            return {error: 'esta intentando agregar boleta con cliente inexistente'}
        }
        return {error: 'error al registrar'}
    }
};

let listarboleta = async () => {
    try {
        let consulta = {
            text: `SELECT b.id, b.fecha, c.rut, c.nombre, c.correo, b.id_cliente 
                   FROM boletas AS b 
                   INNER JOIN clientes AS c ON c.id = b.id_cliente` 
        }
        const resultado = await pool.query (consulta)
        return resultado.rows
    } catch (error) {
        return error
    }
}

let modificarboletas = async (id, nueva_boleta) => {
    try {
        let consulta = {
            text: ` UPDATE boletas SET id_cliente=$1, fecha=$2 WHERE id=$3 RETURNING *`,
            values: [nueva_boleta.id_cliente, nueva_boleta.fecha, id]
        }
        const resultado = await pool.query(consulta)
        return resultado.rows
    }catch (error) {
        console.log(error.message);
            if (error.code == '23503' && error.constraint == 'boletas_id_cliente_fkey') {
                return {error: 'esta intentando editar boleta con cliente inexistente'}
            }
            return {error: 'error al editar la boleta'}

    }
}

let eliminarBoletas = async (id) => {
    try {
        let consulta = {
            text: `DELETE FROM boletas WHERE id = $1 RETURNING *`,
            values: [id]
        }
        const resultado = await pool.query(consulta)
        return resultado.rows
    }catch (error) {    
        return {error: 'error al eliminar la boleta'}

    }
}

module.exports = { nuevaBoleta, listarboleta, modificarboletas, eliminarBoletas }
