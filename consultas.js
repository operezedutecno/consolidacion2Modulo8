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

module.exports = { nuevaBoleta }
