const {
  createPaymentService,
  handleCallback,
  checkOrderStatus,
} = require("../services/paymentService");

const createPayment = async (req, res) => {
  try {
    const { userData } = req.body;
    const result = await createPaymentService(userData);
    console.log("result", result);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating payment" });
  }
};

const callback = (req, res) => {
  const result = handleCallback(req.body);
  res.json(result);
};

const checkStatusOrder = async (req, res) => {
  // Lấy app_trans_id từ tham số URL
  const orderId = req.params.orderId;

  // Kiểm tra nếu app_trans_id được cung cấp
  if (!orderId) {
    return res.status(400).json({ message: "orderId is required" });
  }

  try {
    const result = await checkOrderStatus(orderId);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error checking order status:", error.message);
    res
      .status(500)
      .json({ message: "Error checking order status", error: error.message });
  }
};

module.exports = { createPayment, callback, checkStatusOrder };
