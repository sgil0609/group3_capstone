const express = require("express");
const productRouter = express.Router();
const prisma = require("../db/client");

//userRouter.get("/", async (req, res, next) => {
productRouter.get("/", async (req, res, next) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

module.exports = productRouter;
