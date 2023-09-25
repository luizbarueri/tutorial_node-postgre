require("dotenv").config();
 
const db = require("./db");
 
const port = process.env.PORT;
 
const express = require('express'); 
const app = express();

app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Funcionando!' }));

app.get('/clientes', async (req, res) => { 
    const customers = await db.selectCustomers();
    res.json(customers);
})

//inicia o servidor
app.listen(port);
console.log('API funcionando!');