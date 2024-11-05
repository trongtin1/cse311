const {
  createUserService,
  loginService,
  getUserService,
  checkUserService,
} = require("../services/userService");

const createUSer = async (req, res) => {
  //   console.log("check req...", req.body);
  const { name, email, password } = req.body;
  const data = await createUserService(name, email, password);
  return res.status(200).json(data);
};

const handleLogin = async (req, res) => {
  //   console.log("check req...", req.body);
  const { email, password } = req.body;
  const data = await loginService(email, password);
  return res.status(200).json(data);
};
const getUser = async (req, res) => {
  //   console.log("check req...", req.body);
  const data = await getUserService();
  return res.status(200).json(data);
};
const checkUser = async (req, res) => {
  //   console.log("check req...", req.body);
  const { email } = req.body;
  const data = await checkUserService(email);
  return res.status(200).json(data);
};
module.exports = {
  createUSer,
  handleLogin,
  getUser,
  checkUser,
};
