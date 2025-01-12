import mysql2 from 'mysql2';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const con = mysql2.createConnection({
    host: 'localhost', 
    user: 'root',
    password: 'K!tsun3kitsune',
    database: 'crud_db'
})

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

app.get('/api/users', (req, res) => {
    let sql = 'SELECT * FROM user';
    let query = con.query(sql, (err, result) => {
        if (err) console.log('Something wrong');
        else return res.send(result);
    })
})

app.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    let sql = `SELECT * FROM user WHERE user_id = ${id}`;
    let query = con.query(sql, (err, result) => {
        if (err) console.log('Something wrong');
        else return res.send(result);
    })
})

app.post('/api/users', (req, res) => {
    const user_name = req.body.user_name;
    const user_email = req.body.user_email;
    const user_address = req.body.user_address;
    const user_phone = req.body.user_phone;

    let sql = `INSERT INTO user (user_name, user_email, user_address, user_phone) VALUES ("${user_name}", "${user_email}", "${user_address}", "${user_phone}")`;
    let query = con.query(sql, (err, result) => {
        if (err) console.log(err);
        else return res.send(result);
    })
})

app.put('/api/users/:id', (req, res) => {
    const user_name = con.escape(req.body.user_name);
    const user_email = con.escape(req.body.user_email);
    const user_address = con.escape(req.body.user_address);
    const user_phone = con.escape(req.body.user_phone);

    const id = req.params.id;

    let sql = `
    UPDATE user SET 
    user_name = ${user_name}, 
    user_email = ${user_email}, 
    user_address = ${user_address}, 
    user_phone = ${user_phone} 
    WHERE user_id = ${id}`;
    let query = con.query(sql, (err, result) => {
        if (err) console.log(err);
        else return res.send(result);
    })
})

app.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    let sql = `DELETE FROM user WHERE user_id = ${id}`;
    let query = con.query(sql, (err, result) => {
        if (err) console.log(err);
        else return res.send(result);
    })
})