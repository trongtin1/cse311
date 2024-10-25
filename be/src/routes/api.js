const express = require("express");
const {
  createUSer,
  handleLogin,
  getUser,
  checkUser,
} = require("../controllers/userController");
const {
  createPayment,
  callback,
  checkStatusOrder,
} = require("../controllers/paymentController");

const routerAPI = express.Router();

// const { getUsersAPI, postCreateUserAPI,
//     putUpdateUserAPI, deleteUserAPI

// } = require('../controllers/apiController')

// routerAPI.get('/users', getUsersAPI);
// routerAPI.post('/users', postCreateUserAPI);
// routerAPI.put('/users', putUpdateUserAPI);
// routerAPI.delete('/users', deleteUserAPI);

routerAPI.get("/", (req, res) => {
  return res.status(200).json("hello world12312312");
});
routerAPI.post("/register", createUSer);
routerAPI.post("/login", handleLogin);
routerAPI.get("/user", getUser);
routerAPI.post("/check", checkUser);
routerAPI.post("/payment", createPayment);
routerAPI.post("/callback", callback);
routerAPI.post("/check-status-order/:app_trans_id", checkStatusOrder);
module.exports = routerAPI; //export default
