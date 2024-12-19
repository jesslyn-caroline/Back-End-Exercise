import mysql2 from 'mysql2';
import express from 'express';
import cors from 'cors';

const con = mysql2.createConnection({
    host: 'localhost', 
    user: 'root',
    password: '',
    database: '231111664_crud_db'
})

const app = express();
const port = 3000;

app.use(cors())

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})

app.get('/api/products', (req, res) => {
    let sql = 'SELECT * FROM product';
    let query = con.query(sql, (err, result) => {
        if (err) console.log('Something wrong');
        else {
            console.log('Success 5555');
            console.log(result)
            return res.send(result);
        }
    })
})


app.get('/api/products/:id', (req, res) => {
    let id = req.params.id
    let sql = `SELECT * FROM product WHERE product_id = ${id}`;
    let query = con.query(sql, (err, result) => {
        if (err) console.log('Something wrong');
        else {
            console.log('Success');
            return res.send(result);
        }
    })
})