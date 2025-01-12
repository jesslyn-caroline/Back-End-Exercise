import express from 'express';

import Supplier from '../models/supplier.js';

const router = express.Router();

router.get('/', (req, res) => {
    Supplier.findAll().then((result) => {
        res.render('pages/admin/supplier/index', { supplier: result, user: req.session.user || ''})
    })
})

router.get('/create', (req, res) => {
    res.render('pages/admin/supplier/add');
})

router.get('/edit/:id', (req, res) => {
    Supplier.findOne({
        where: {
            id: req.params.id
        }
    }).then((result) => {
        res.render('pages/admin/supplier/edit', { supplier: result })
    })
})

router.delete('/api/supplier/:id', (req, res) => {
    Supplier.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.json({
            status: 500,
            error: null,
            response: 'Data successfully deleted'
        })
    }).catch((err) => {
        res.json({
            status: 400,
            error: err,
            response: {}
        })
    })
})

router.post('/api/suppliers', (req, res) => {
    Supplier.create({
        company_name: req.body.company_name,
        contact_name: req.body.contact_name,
        email: req.body.email,
        phone: req.body.phone,
        active: req.body.active,
        createdBy: req.session.user.username
    }).then(() => {
        res.json({
            status: 500,
            error: null,
            response: 'Data successfully added'
        })
    }).catch((err) => {
        res.json({
            status: 400,
            error: err,
            response: {}
        })
    })
})

router.put('/api/supplier/:id', (req, res) => {
    Supplier.update({
        company_name: req.body.company_name,
        contact_name: req.body.contact_name,
        email: req.body.email,
        phone: req.body.phone,
        active: req.body.active,
        updatedBy: req.session.user.username
    }, {
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.json({
            status: 500,
            error: null,
            response: 'Data successfully updated'
        })
    }).catch((err) => {
        res.json({
            status: 400,
            error: err,
            response: {}
        })
    })
})

export default router;