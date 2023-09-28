require("dotenv").config();
 
const db = require("./db");
 
const port = process.env.PORT;
 
const express = require('express'); 
const app = express();

app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Funcionando!' }));

// app.get('/clientes/:id', async (req, res) => { 
//     const customer = await db.selectCustomer(req.params.id);
//     res.json(customer);
// })

app.delete('/clientes/:id', async (req, res) =>{
    await db.deleteCustomer(req.params.id);
    res.sendStatus(204);
})

app.get('/clientes', async (req, res) => { 
    const customers = await db.selectCustomers();
    res.json(customers);
})

//inicia o servidor
app.listen(port);
console.log('API funcionando!');