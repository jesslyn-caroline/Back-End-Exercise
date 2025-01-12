import express from 'express';
import Product from '../models/product.js';

const router = express.Router();

router.get('/', (req, res) => {
    Product.findAll().then((result) => {
        res.render('pages/admin/product/index', {product: result, user: req.session.user || ""});
    })
});

router.get('/create', (req, res) => {
    res.render('pages/admin/product/add');
})

router.get('/edit/:id', (req, res) => {
    Product.findOne({ 
        where: { id: req.params.id }
    }).then((results) => {
        res.render('pages/admin/product/edit', {product: results})
    })
})

router.post('/api/product', (req, res) => {
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

router.put('/api/product/:id', (req, res) => {
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

router.delete('/api/product/:id', (req, res) => {
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

export default router;