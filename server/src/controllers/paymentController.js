const {
  createPaymentService,
  handleCallback,
  checkOrderStatus,
} = require("../services/paymentService");
// const paymentService = require("../services/paymentService");

const createPayment = async (req, res) => {
  try {
    const result = await createPaymentService(req.body);
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
  const app_trans_id = req.params.app_trans_id;

  // Kiểm tra nếu app_trans_id được cung cấp
  if (!app_trans_id) {
    return res.status(400).json({ message: "app_trans_id is required" });
  }

  try {
    const result = await checkOrderStatus(app_trans_id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error checking order status:", error.message);
    res
      .status(500)
      .json({ message: "Error checking order status", error: error.message });
  }
};

module.exports = { createPayment, callback, checkStatusOrder };
