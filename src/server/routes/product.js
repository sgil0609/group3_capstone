const express = require("express");
const router = express.Router();

// Product routes
router.get("/products", (req, res) => {
  res.json({ message: "product retrieved successfully" });
});

router.get("/products/:id", (req, res) => {});

router.post("/products", (req, res) => {});

router.put("/products/:id", (req, res) => {});

router.delete("/products/:id", (req, res) => {});

module.exports = router;