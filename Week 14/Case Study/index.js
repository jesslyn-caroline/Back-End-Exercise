import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';

import user_route from './routers/user.js';
import admin_route from './routers/admin.js';

import forAdmin from './controllers/auth.js';

const app = express();
const port = 3000;

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
app.use('/admin/product', forAdmin, admin_route);

app.get('/', (req, res) => {
    res.render('pages/home', {user: req.session.user || ''});
})

app.get('/forbidden', (req, res) => {
    res.render('pages/forbidden');
})