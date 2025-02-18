import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';

import Product from './models/product.js'
import user_controller from './controllers/user.js';


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

app.use(session({
    secret: 'Secret',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge:60*60*1000}
}))


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    Product.findAll().then((result) => {
        res.render('pages/home', {product: result, user: req.session.user || ""});
    })
});

app.get('/create', (req, res) => {
    res.render('pages/add');
})

app.get('/edit/:id', (req, res) => {
    Product.findOne({ 
        where: { id: req.params.id }
    }).then((results) => {
        res.render('pages/edit', {product: results})
    })
})

app.get('/login', user_controller.login);
app.get('/logout', user_controller.logout);
app.post('/login', user_controller.auth);


app.post('/api/product', (req, res) => {
    Product.create({
        name: req.body.name, 
        price: req.body.price
    }).then((result) => {
        res.json({
            status: 200,
            error: null,
            response: result
        })
    }).catch((err) => {
        res.json({
            status: 500,
            error: err,
            response: {}
        })
    })
})

app.put('/api/product/:id', (req, res) => {
    Product.update({
        name: req.body.name, 
        price: req.body.price
    }, {
        where : {id: req.params.id}
    }).then((result) => {
        res.json({
            status: 200,
            error: null,
            response: result
        })
    }).catch((err) => {
        res.json({
            status: 500,
            error: err,
            response: {}
        })
    })
})

app.delete('/api/product/:id', (req, res) => {
    Product.destroy({where: {id: req.params.id}}).then(() => {
        res.json({
            status: 200,
            error: null,
            response: {}
        })
    }).catch((err) => {
        res.json({
            status: 500,
            error: err,
            response: {}
        })
    });
})

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`)
});