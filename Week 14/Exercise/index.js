import express from 'express';
import session from 'express-session';


import user_route from './routers/user.js';
import product_route from './routers/product.js';
import supplier_route from './routers/supplier.js';

import forRegistered from './controllers/auth.js';

const app = express();
const port = 3001;

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
})

app.use(express.json());
app.use(express.urlencoded());

app.use(session({
    secret: 'Secret',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge:60*60*1000}
}))

app.set('view engine', 'ejs');

app.use('/user', user_route);
app.use('/admin/product', forRegistered, product_route);
app.use('/admin/supplier', forRegistered, supplier_route);


app.get('/', (req, res) => {
    res.render('pages/home', {user: req.session.user || ''});
})

app.get('/forbidden', (req, res) => {
    res.render('pages/forbidden');
})