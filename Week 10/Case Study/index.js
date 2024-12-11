import express from 'express';
import mysql2 from 'mysql2';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 8080;

app.use('/pages', express.static(`${__dirname}/pages`));

const log = (req, res, next) => {
    // if (req.url == '/favicon.ico') return next();
    console.log(`Param: ${req.params.username} ${new Date().toLocaleString()}`);
    next();
}

const check = (req, res, next) => {
    let username = req.params.username;
    let arr = ['jess', 'eve', 'fox', 'bunny', 'frog'];
    let found = false;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == username) found = true;
    }
    if (found) next();
    else next('route');
}

console.log(`${__dirname}/pages`)

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/pages/about.html`, (err) => {
        if (err) res.status(err.status).end();
    })
})

app.get('/:username', check, log, (req, res) => {
    res.sendFile(`${__dirname}/pages/user.html`, (err) => {
        if (err) res.status(err.status).end();
    })
})

app.get('/:username', (req, res) => {
    res.sendFile(`${__dirname}/pages/unknown.html`, (err) => {
        if (err) res.status(err.status).end();
    })
})

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`)
})