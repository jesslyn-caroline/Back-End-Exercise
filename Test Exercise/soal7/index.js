import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 9080;

app.use(express.static('templatemo_559_zay_shop'));

app.get('/', (req, res) => {
    console.log(`${__dirname}/templatemo_559_zay_shop/index.html`);
    res.sendFile(`${__dirname}/templatemo_559_zay_shop/index.html`);
})

app.get('/page/about', (req, res) => {
    console.log(`${__dirname}/templatemo_559_zay_shop/about.html`);
    res.sendFile(`${__dirname}/templatemo_559_zay_shop/about.html`);
})

app.get('/page/contact', (req, res) => {
    console.log(`${__dirname}/templatemo_559_zay_shop/contact.html`);
    res.sendFile(`${__dirname}/templatemo_559_zay_shop/contact.html`);
})

app.get('/page/shop', (req, res) => {
    console.log(`${__dirname}/templatemo_559_zay_shop/shop.html`);
    res.sendFile(`${__dirname}/templatemo_559_zay_shop/shop.html`);
})

app.get('/shop/:id', (req, res) => {
    console.log(`${__dirname}/templatemo_559_zay_shop/shop-single.html`);
    res.sendFile(`${__dirname}/templatemo_559_zay_shop/shop-single.html`);
})

app.all('*', (req, res) => {
    res.send(`<h1>404 Not Found Page</h1>`)
})


app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
})