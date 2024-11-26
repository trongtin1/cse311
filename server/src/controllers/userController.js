const {
  createUserService,
  loginService,
  getUserService,
  checkUserService,
} = require("../services/userService");
const UserController = {
  createUSer: async (req, res) => {
    try {
      const { userData } = req.body;

      if (!userData) {
        return res.status(400).json({
          success: false,
          message: "No user data provided",
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
  },
  handleLogin: async (req, res) => {
    const { email, password } = req.body;
    const data = await loginService(email, password);
    console.log(data);
    return res.status(200).json(data);
  },
  getUser: async (req, res) => {
    const data = await getUserService();
    return res.status(200).json(data);
  },
  checkUser: async (req, res) => {
    const { email } = req.body;
    const data = await checkUserService(email);
    return res.status(200).json(data);
  },
};
module.exports = {
  UserController,
};
