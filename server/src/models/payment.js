const mongoose = require("mongoose");

// Define the Payment schema
const payment = new mongoose.Schema({
  orderId: String,
  app_user: String,
  amount: Number,
  status: String,
  createdAt: { type: Date, default: Date.now },
});

// Create the Payment model
const Payment = mongoose.model("Payment", payment);

module.exports = Payment;
