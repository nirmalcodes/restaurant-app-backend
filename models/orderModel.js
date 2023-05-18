const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    orderType: {
      type: String,
      enum: ["Dine-in", "Takeaway"],
      required: true,
    },
    tableId: {
      type: String,
      required: function () {
        return this.orderType === "Dine-in";
      },
      default: null,
    },
    items: [],
    total: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Card"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
