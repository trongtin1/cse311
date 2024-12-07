const axios = require("axios");
const crypto = require("crypto");
const Payment = require("../models/payment");
const User = require("../models/user");
const url = process.env.NGROK;
// Định nghĩa đầy đủ các hằng số
const MOMO_CONFIG = {
  accessKey: "F8BBA842ECF85",
  secretKey: "K951B6PE1waDMi640xX08PD3vg6EkVlz",
  partnerCode: "MOMO",
  orderInfo: "pay with MoMo",
  redirectUrl: "http://localhost:3000/",
  ipnUrl: "https://8a0e-171-250-165-235.ngrok-free.app/callback",
  requestType: "payWithMethod",
  extraData: "",
  orderGroupId: "",
  autoCapture: true,
  lang: "vi",
};

const createPaymentService = async (requestData) => {
  console.log("requestData:", requestData);
  // Mã hóa thông tin user vào extraData
  const userDataBase64 = Buffer.from(JSON.stringify(requestData)).toString(
    "base64"
  );
  const {
    accessKey = MOMO_CONFIG.accessKey,
    secretKey = MOMO_CONFIG.secretKey,
    orderInfo = MOMO_CONFIG.orderInfo,
    partnerCode = MOMO_CONFIG.partnerCode,
    redirectUrl = MOMO_CONFIG.redirectUrl,
    ipnUrl = MOMO_CONFIG.ipnUrl,
    requestType = MOMO_CONFIG.requestType,
    orderGroupId = MOMO_CONFIG.orderGroupId,
    autoCapture = MOMO_CONFIG.autoCapture,
    lang = MOMO_CONFIG.lang,
  } = MOMO_CONFIG;

  const amount = "200000";
  const orderId = partnerCode + new Date().getTime();
  const requestId = orderId;
  const extraData = userDataBase64;

  const rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    amount +
    "&extraData=" +
    extraData +
    "&ipnUrl=" +
    ipnUrl +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;

  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  const requestBody = {
    partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId,
    amount,
    orderId,
    orderInfo,
    redirectUrl,
    ipnUrl,
    lang,
    requestType,
    autoCapture,
    extraData,
    orderGroupId,
    signature,
  };

  const options = {
    method: "POST",
    url: "https://test-payment.momo.vn/v2/gateway/api/create",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(JSON.stringify(requestBody)),
    },
    data: requestBody,
  };

  const result = await axios(options);
  await Payment.create({
    orderId: orderId,
    app_user: requestData.email,
    amount: parseInt(amount, 10),
    status: "pending",
  });
  return result.data;
};

const handleCallback = async (callbackData) => {
  console.log("callback:", callbackData);
  // Mã hóa
  const userData = JSON.parse(
    Buffer.from(callbackData.extraData, "base64").toString()
  );

  await Payment.updateOne(
    { orderId: callbackData.orderId },
    { status: "success" }
  );
  // await User.create({
  //   email: userData.email,
  //   name: userData.name,
  //   password: userData.password,
  // });

  await axios.post("http://localhost:8080/register", {
    userData: {
      email: userData.email,
      name: userData.name,
      password: userData.password,
    },
  });
};

const checkOrderStatus = async (orderId) => {
  try {
    // Sử dụng config từ MOMO_CONFIG
    const { secretKey, accessKey, partnerCode } = MOMO_CONFIG;

    const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=${partnerCode}&requestId=${orderId}`;
    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");

    const requestBody = {
      partnerCode: partnerCode,
      requestId: orderId,
      orderId: orderId,
      signature: signature,
      lang: "vi",
    };

    const response = await axios({
      method: "POST",
      url: "https://test-payment.momo.vn/v2/gateway/api/query",
      headers: {
        "Content-Type": "application/json",
      },
      data: requestBody,
    });

    // Giải thích status code
    const resultCode = response.data.resultCode;
    let status;
    switch (resultCode) {
      case 0:
        status = "Giao dịch thành công";
        break;
      case 1006:
        status = "Giao dịch bị từ chối";
        break;
      case 1003:
        status = "Giao dịch đã hết hạn";
        break;
      case 1002:
        status = "Đơn hàng đã được thanh toán";
        break;
      default:
        status = "Giao dịch thất bại";
    }

    return {
      ...response.data,
      statusMessage: status,
    };
  } catch (error) {
    throw new Error(`Lỗi kiểm tra trạng thái: ${error.message}`);
  }
};

module.exports = {
  createPaymentService,
  handleCallback,
  checkOrderStatus,
};
