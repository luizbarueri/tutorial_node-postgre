async function connect() {
    if (global.connection)
        return global.connection.connect();
 
    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING
    });
 
    //apenas testando a conexão
    const client = await pool.connect();
    console.log("Criou pool de conexões no PostgreSQL!");
 
    const res = await client.query('SELECT NOW()');
    console.log(res.rows[0]);
    client.release();
 
    //guardando para usar sempre o mesmo
    global.connection = pool;
    return pool.connect();
}
 
connect();

async function selectCustomers() {
    const client = await connect();
    const res = await client.query('SELECT * FROM cadcli');
    return res.rows;
}
 
async function selectCustomer(id) {
    const client = await connect();
    const res = await client.query('SELECT * FROM cadcli WHERE ID=$1', [id]);
    return res.rows;
}
 
async function deleteCustomer(id) {
    const client = await connect();
    return await client.query('DELETE FROM cadcli where id=$1;', [id]);
    
}
 
module.exports = { selectCustomers, selectCustomer, deleteCustomer }

