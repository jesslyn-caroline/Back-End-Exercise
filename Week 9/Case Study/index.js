import express from 'express';
import mysql2 from 'mysql2';
import bodyParser from 'body-parser';

const app = express();
const con = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_db'
})

con.connect((err) => {
    if (err) console.log('Unable to connect to database');
    else console.log('Database connected!');
})

const port = 3000;

app.use(bodyParser.json());

app.post('/api/products', (req, res) => {
    let product_name = con.escape(req.body.product_name);
    let product_price = con.escape(req.body.product_price);

    let sql = `INSERT INTO product (product_name, product_price) VALUES (${product_name}, ${product_price})`;
    let query = con.query(sql, (err,result) => {
    if (err) console.log("Something wrong");
    else res.send(JSON.stringify({"status" : 200, "error" : null, "response" : "Insert data successful"}));
  })
})

app.get('/api/products', (req, res) => {
    let sql = `SELECT * FROM product`;
    let query = con.query(sql, (err, result) => {
        if (err) console.log("Something wrong");
        else res.json({"status" : 200, "error" : null, "response" : result});
    })
})

app.get('/api/products/:id', (req, res) => {
    let id = req.params.id;
    let sql = `SELECT * FROM product WHERE product_id = ${id}`;
    let query = con.query(sql, (err, result) => {
        if (err) console.log("Something wrong");
        else res.json({"status" : 200, "error" : null, "response" : result});
    })
})

app.put('/api/products/:id', (req, res) => {
    let id = req.params.id;

    let product_name = con.escape(req.body.product_name);
    let product_price = con.escape(req.body.product_price);

    let sql = `UPDATE product SET product_name = ${product_name}, product_price = ${product_price} WHERE product_id = ${id}`;
    let query = con.query(sql, (err, result) => {
        if (err) console.log("Something wrong");
        else res.json({"status" : 200, "error" : null, "response" : "Update data successful"});
    })
})

app.delete('/api/products/:id', (req, res) => {
    let id = req.params.id;
    let sql = `DELETE FROM product WHERE product_id = ${id}`;
    let query = con.query(sql, (err, result) => {
        if (err) console.log("Something wrong");
        else res.json({"status" : 200, "error" : null, "response" : "Delete data successful"});
    })
})

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`)
})