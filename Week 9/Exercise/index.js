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

const port = 8080;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // id using form url encoded


app.get('/api/comments', (req, res) => {
    let sql = `SELECT * FROM comment`;
    let query = con.query(sql, (err, result) => {
        if (err) console.log("Something wrong");
        else res.json({"status" : 200, "error" : null, "response" : result});
    })
})

app.get('/api/comments/:id', (req, res) => {
    let id = req.params.id;
    let sql = `SELECT * FROM comment WHERE comment_id = ${id}`;
    let query = con.query(sql, (err, result) => {
        if (err) console.log("Something wrong");
        else res.json({"status" : 200, "error" : null, "response" : result});
    })
})

app.get('/api/comments/customer/:id', (req, res) => {
    let id = req.params.id;
    let sql = `SELECT * FROM comment WHERE cust_id = ${id}`;
    let query = con.query(sql, (err, result) => {
        if (err) console.log("Something wrong");
        else res.json({"status" : 200, "error" : null, "response" : result});
    })
})

app.post('/api/comments', (req, res) => {
    let cust_id = con.escape(req.body.customer_id);
    let product_id = con.escape(req.body.product_id);
    let comment_text = con.escape(req.body.comment_text);
    let sql = `INSERT INTO comment (cust_id, product_id, comment_text) VALUES (${cust_id}, ${product_id}, ${comment_text})`;
    let query = con.query(sql, (err, result) => {
        if (err) console.log("Something is wrong");
        else res.json({"Status": "Success"});
    })
})

app.delete('/api/comments/:id', (req, res) => {
    let id = req.params.id;
    let sql = `DELETE FROM comment WHERE comment_id = ${id}`;
    let query = con.query(sql, (err, result) => {
        if (err) console.log("Something wrong");
        else res.json({"Status" : "Success"});
    })
})

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`)
})