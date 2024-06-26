const express = require("express");
const productCategory = express.Router();
const prisma = require("../db/client");

// Route to get all catgegory
productCategory.get("/", async (req, res, next) => {
  try {
    const product_Category = await prisma.product_Category.findMany();
    res.status(200).json(product_Category);
  } catch (error) {
    console.error("Failed to fetch all categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

productCategory.post("/add", async (req, res) => {
  const { name, description } = req.body;
  try {
    const newCategory = await prisma.product_Category.create({
      data: {
        name,
        description,
      },
    });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Failed to create product:", error);
    res.status(500).json({ message: "Unable to add" });
  }
});

module.exports = productCategory;
