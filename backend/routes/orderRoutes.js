const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const verifyToken = require('../middleware/authMiddleware')
require('dotenv').config();

router.get('/orders', verifyToken, async (req, res) => {

    try {
        const orders = await Order.find({ user: req.user.userId}).populate(products.product);
        res.status(200).json({orders});
    } catch (err) {
        console.error(err); 
        res.status(500).json({ error: 'server error' });
    }
});

router.post('/', verifyToken, async (req, res) => {

    try {
        const { products, totalAmount } = req.body;
        const newOrder = new Order({
            user: req.user.userId,
            products,
            totalAmount
        });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        console.error(err); 
        res.status(500).json({ error: 'order placing failed' });
    }
});



module.exports = router;