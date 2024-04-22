const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
app.use(express.json()); // for parsing application/json

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/products", async (req, res) => {
  try {
    const newProduct = await prisma.product.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        stock: req.body.stock,
        price: req.body.price,
        productCategoryId: req.body.productCategoryId,
      },
    });

    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name: req.body.name,
        description: req.body.description,
        stock: req.body.stock,
        price: req.body.price,
        productCategoryId: req.body.productCategoryId,
      },
    });

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await prisma.product.delete({
      where: { id: Number(id) },
    });

    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
