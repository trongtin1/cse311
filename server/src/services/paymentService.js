const axios = require("axios");
const CryptoJS = require("crypto-js");
const moment = require("moment");
const qs = require("qs");
const Payment = require("../models/payment");
const config = {
  app_id: process.env.APP_ID,
  key1: process.env.KEY1,
  key2: process.env.KEY2,
  endpoint: process.env.ENDPOINT,
};
const NGROK_URL = process.env.NGROK;
const createPaymentService = async (orderDetails) => {
  const embed_data = {
    redirecturl: "http://localhost:3000/",
    name: orderDetails.name, // Thêm thông tin người dùng
    email: orderDetails.email,
    password: orderDetails.password,
  };

  const items = [];
  const transID = Math.floor(Math.random() * 1000000);

  const order = {
    app_id: config.app_id,
    app_trans_id: `${moment().format("YYMMDD")}_${transID}`,
    app_user: orderDetails.email,
    app_time: Date.now(),
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    amount: 50000,
    callback_url: `${NGROK_URL}/callback`,
    description: `Lazada - Payment for the order #${transID}`,
    bank_code: "",
  };

  const data =
    config.app_id +
    "|" +
    order.app_trans_id +
    "|" +
    order.app_user +
    "|" +
    order.amount +
    "|" +
    order.app_time +
    "|" +
    order.embed_data +
    "|" +
    order.item;

  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  try {
    const result = await axios.post(config.endpoint, null, { params: order });

    let payment = await Payment.create({
      app_trans_id: order.app_trans_id,
      app_user: order.app_user,
      amount: order.amount,
      status: "pending",
    });

    console.log(`Payment saved with ID: ${payment._id}`);
    return {
      data: result.data,
      status: "pending",
      app_trans_id: order.app_trans_id,
    };
  } catch (error) {
    console.log(error);
  }
};

const handleCallback = async (body) => {
  const { data: dataStr, mac: reqMac } = body;
  const mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();

  if (reqMac !== mac) {
    return { return_code: -1, return_message: "mac not equal" };
  }

  const dataJson = JSON.parse(dataStr);

  console.log(
    `Update order status to success for app_trans_id = ${dataJson.app_trans_id}`
  );

  const paymentUpdateResult = await Payment.updateOne(
    { app_trans_id: dataJson.app_trans_id },
    { status: "success", updated_at: Date.now() }
  );

  // Lấy thông tin người dùng từ embed_data
  const embedData = JSON.parse(dataJson.embed_data);
  const { name, email, password } = embedData;

  console.log(`Name: ${name}, Email: ${email}`);
  // Gọi API để tạo người dùng mới
  try {
    const response = await axios.post("http://localhost:8080/register", {
      name,
      email,
      password,
    });
  } catch (error) {
    console.error("Error creating user:", error);
  }

  return { return_code: 1, return_message: "success" };
};

const checkOrderStatus = async (app_trans_id) => {
  const postData = {
    app_id: config.app_id,
    app_trans_id,
  };

  const data = `${postData.app_id}|${postData.app_trans_id}|${config.key1}`;
  postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  let postConfig = {
    method: "post",
    url: "https://sb-openapi.zalopay.vn/v2/query",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: qs.stringify(postData),
  };

  try {
    const result = await axios(postConfig);
    return result.data;
    /**
     * kết quả mẫu
      {
        "return_code": 1, // 1 : Thành công, 2 : Thất bại, 3 : Đơn hàng chưa thanh toán hoặc giao dịch đang xử lý
        "return_message": "",
        "sub_return_code": 1,
        "sub_return_message": "",
        "is_processing": false,
        "amount": 50000,
        "zp_trans_id": 240331000000175,
        "server_time": 1711857138483,
        "discount_amount": 0
      }
    */
  } catch (error) {
    console.error("Order status check error:", error);
    throw new Error("Failed to check order status");
  }
};

module.exports = { createPaymentService, handleCallback, checkOrderStatus };
