const express = require("express");
const cartRouter = express.Router();
const prisma = require("../db/client");
cartRouter.use(express.json());

// POST endpoint to create an order
cartRouter.post('/add-to-cart', async (req, res) => {
    const { userId, productId, total } = req.body;

    try {
        const newOrder = await prisma.order.create({
            data: {
                userId,
                total,
                status: 'PENDING', 
                order_items: {
                    create: [{
                        productId,
                        quantity: 1,  
                        unit_price: total
                    }]
                }
            }
        });

        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Failed to create order:', error);
        res.status(500).send('Failed to add to cart');
    }
});

module.exports = cartRouter;