const express = require('express');
const router = express.Router();
const Prodcut = require('../models/product');
const verifyToken = require('../middleware/authMiddleware')
const { isAdmin } = require('../middleware/rolesMiddleware')
require('dotenv').config();

router.get('/', async (req, res) => {

    try {
        constproducts = await Prodcut.find();
        res.status(200).json(products);
    } catch (err) {
        console.error(err); 
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/', verifyToken, isAdmin, async (req, res) => {

    try {
        const { name, description, price, stock_quantity } = req.body;
        const newProduct = new Prodcut({ name, description, price, stock_quantity });
        await newProduct.save();
        
        res.status(201).json({ newProduct});
    } catch (err) {
        console.error(err); 
        res.status(500).json({ error: 'product creation failed' });
    }
});

module.exports = router;