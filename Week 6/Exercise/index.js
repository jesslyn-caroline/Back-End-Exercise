import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`)
})

app.get('/about', (req, res) => {
    res.sendFile(`${__dirname}/public/about.html`)
})

app.get('/special', (req, res) => {
    res.sendFile(`${__dirname}/public/special.html`)
})

app.get('/populer', (req, res) => {
    res.sendFile(`${__dirname}/public/populer.html`)
})

app.get('/product/:name', (req, res) => {
    const nama = req.params.name;
    res.send(`Product name : ${nama}`)
})

app.listen(3030, () => {
    console.log(`Listening on port http://localhost:${3030}`)
})