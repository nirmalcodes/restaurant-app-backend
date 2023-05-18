const express = require("express");
const {
  createOrder,
  getOrders,
  getOrder,
  deleteOrder,
  updateOrder,
} = require("../controllers/orderController");

const router = express.Router();

// GET all orders
router.get("/", getOrders);

// GET a single order
router.get("/:id", getOrder);

// POST a new order
router.post("/", createOrder);

// DELETE a order
router.delete("/:id", deleteOrder);

// UPDATE a order
router.patch("/:id", updateOrder);

module.exports = router;
