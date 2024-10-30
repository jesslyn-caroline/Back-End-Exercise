import mysql2 from "mysql2";
import express from "express";

const app = express();
const con = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'K!tsun3kitsune',
    database: 'store_db'
})

const port = 8000;

con.connect((err) => {
    if (err) console.log("Connection Failed.");
    else console.log("Connected.")
})

app.get('/api/customers', (req, res) => {
    let sql = "SELECT * FROM customers";
    let query = con.query(sql, (err, result) => {
        if (err) console.log("Failed to load data.");
        else {
            console.log("Fetching data.");
            return res.json(result);
        }
    })
})

app.get('/api/customers/:nama', (req, res) => {
    let nama = req.params.nama;
    let sql = "SELECT * FROM customers WHERE cust_id = '${nama}'";
    let query = con.query(sql, (err, result) => {
        if (err) console.log("Failed to load data.");
        else {
            console.log("Fetching data.");
            return res.json(result);
        }
    })
})

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
})