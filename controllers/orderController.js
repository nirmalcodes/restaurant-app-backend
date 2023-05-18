const Order = require("../models/orderModel");
const mongoose = require("mongoose");

// get all orders
const getOrders = async (req, res) => {
  const orders = await Order.find({}).sort({ createdAt: -1 });

  res.status(200).json(orders);
};

// get a single order
const getOrder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Order" });
  }

  const order = await Order.findById(id);

  if (!order) {
    return res.status(404).json({ error: "No such Order" });
  }

  res.status(200).json(order);
};

// create a order
const createOrder = async (req, res) => {
  const { orderType, tableId, items, total, paymentMethod } =
    req.body;

  // add doc to db
  try {
    const order = await Order.create({
      orderType,
      tableId,
      items,
      total,
      paymentMethod,
    });
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a order
const deleteOrder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Order" });
  }

  const order = await Order.findOneAndDelete({ _id: id });

  if (!order) {
    return res.status(404).json({ error: "No such Order" });
  }

  res.status(200).json(order);
};

// update a order
const updateOrder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Order" });
  }

  const order = await Order.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!order) {
    return res.status(404).json({ error: "No such Order" });
  }

  res.status(200).json(order);
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  deleteOrder,
  updateOrder,
};
