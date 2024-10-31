import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3001;
const hostname = "127.0.0.1";

app.use('/assets', express.static(`${__dirname}/asset`));

app.get('/', (req, res) => {
    res.send('Hello, this is the root route');
});

app.get('/logo', (req, res) => {
    res.sendFile(`${__dirname}/asset/logo.png`, (err) => {
        if (err) {
            res.status(err.status).end();
        }
    });
});

app.listen(port, hostname, () => {
    console.log(`Listening on port http://${hostname}:${port}`);
});
