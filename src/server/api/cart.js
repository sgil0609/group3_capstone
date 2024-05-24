const express = require("express");
const cartRouter = express.Router();
const prisma = require("../db/client");
cartRouter.use(express.json());

cartRouter.get("/users/:userId/orders/pending", async (req, res) => {
  const { userId } = req.params;

  try {
    const pendingOrders = await prisma.order.findMany({
      where: {
        userId: parseInt(userId),
        status: "PENDING",
      },
    });

    res.json(pendingOrders);
  } catch (error) {
    console.error("Failed to retrieve pending orders:", error);
    res.status(500).send("Failed to retrieve pending orders");
  }
});

// POST endpoint to create an order
cartRouter.post("/add-to-cart", async (req, res) => {
  const { userId, productId, total } = req.body;

  try {
    const newOrder = await prisma.order.create({
      data: {
        userId,
        total,
        status: "PENDING",
        order_items: {
          create: [
            {
              productId,
              quantity: 1,
              unit_price: total,
            },
          ],
        },
      },
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).send("Failed to add to cart");
  }
});

cartRouter.put("/users/:userId/orders/complete", async (req, res) => {
  const { userId } = req.params;

  try {
    // Find all orders for the specific user with status "PENDING"
    const pendingOrders = await prisma.order.findMany({
      where: {
        userId: parseInt(userId),
        status: "PENDING",
      },
    });

    // If there are no pending orders for the user, return a success message
    if (pendingOrders.length === 0) {
      return res.json({ message: "No pending orders found for the user" });
    }

    // Update the status of all pending orders to "Completed"
    const updatedOrders = await Promise.all(
      pendingOrders.map((order) => {
        return prisma.order.update({
          where: {
            id: order.id,
          },
          data: {
            status: "Completed",
          },
        });
      })
    );

    res.json({
      message: "All pending orders for the user have been marked as completed",
    });
  } catch (error) {
    console.error("Error updating order statuses:", error);
    res.status(500).json({ error: "Failed to update order statuses" });
  }
});

module.exports = cartRouter;
