const express = require("express");
const productRouter = express.Router();
const prisma = require("../db/client");
const { verify } = require("../middleware/util");

// Route to get all products
productRouter.get("/", async (req, res, next) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    console.error("Failed to fetch all products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Route to get a specific product by ID
productRouter.get("/:id", async (req, res, next) => {
  const productId = parseInt(req.params.id);
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Failed to fetch product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

//add a product only if verified(only logged in user)
productRouter.post("/add", verify, async (req, res) => {
  const { name, description, price, stock, productCategoryId, imageUrl } =
    req.body;
  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        productCategoryId: parseInt(productCategoryId, 10),
        imageUrl,
      },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Failed to create product:", error);
    res.status(500).json({ message: "Unable to add" });
  }
});

productRouter.delete("/delete/:id", verify, async (req, res) => {
  const productId = parseInt(req.params.id);
  try {
    const deleteResponse = await prisma.product.delete({
      where: { id: productId },
    });
    res.status(200).json({
      message: "Product deleted successfully",
      product: deleteResponse,
    });
  } catch (error) {
    console.error("Failed to delete product:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
});

productRouter.patch("/:id", async (req, res) => {
  const productId = parseInt(req.params.id);
  const { name, description, price, stock } = req.body;

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
      },
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Failed to update product:", error);
    res.status(500).json({ message: "Failed to update product" });
  }
});

module.exports = productRouter;
