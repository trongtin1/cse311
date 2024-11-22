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
const adminController = require("../controllers/adminController");

const routerAPI = express.Router();

routerAPI.get("/", (req, res) => {
  return res.status(200).json("hello world12312312");
});
//user api
routerAPI.post("/register", createUSer);
routerAPI.post("/login", handleLogin);
routerAPI.get("/user", getUser);
routerAPI.post("/check", checkUser);
//payment api
routerAPI.post("/payment", createPayment);
routerAPI.post("/callback", callback);
routerAPI.post("/check-status-order/:app_trans_id", checkStatusOrder);
//login api
routerAPI.post("/admin/login", adminController.login);
routerAPI.get("/admin/login", (req, res) => {
  res.render("admin/login", { error: null });
});
//dashboard api
routerAPI.get("/admin/dashboard", adminController.getDashboard);
routerAPI.post("/admin/users", adminController.createUser);
routerAPI.put("/admin/users/:id", adminController.updateUser);
routerAPI.post("/admin/users/:id/delete", adminController.deleteUser);

module.exports = routerAPI; //export default
