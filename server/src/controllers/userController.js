const {
  createUserService,
  loginService,
  getUserService,
  checkUserService,
} = require("../services/userService");

// In server/src/controllers/userController.js
const createUSer = async (req, res) => {
  try {
    const { userData } = req.body;
    console.log("Received user data:", userData);

    if (!userData || !userData.clerkId || !userData.email) {
      return res.status(400).json({
        success: false,
        message: "Missing required user data",
      });
    }

    const data = await createUserService(userData);
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Error creating user",
    });
  }
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
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const exists = await checkUserService(email);
    return res.status(200).json(exists);
  } catch (error) {
    console.error("Error checking user:", error);
    return res.status(500).json({
      success: false,
      message: "Error checking user",
    });
  }
};
module.exports = {
  createUSer,
  handleLogin,
  getUser,
  checkUser,
};
