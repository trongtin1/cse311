const adminService = require("../services/adminService");

const adminController = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const serviceResult = await adminService.loginService(username, password);

      if (serviceResult.EC === 0) {
        return res.status(200).json(serviceResult);
      } else if (serviceResult.EC === 1) {
        return res.status(400).json(serviceResult);
      } else {
        return res.status(500).json(serviceResult);
      }
    } catch (error) {
      console.error("Login controller error:", error);
      return res.status(500).json({
        EC: -1,
        EM: "Something wrong in controller",
        DT: "",
      });
    }
  },

  getDashboard: async (req, res) => {
    try {
      const [usersResult, paymentsResult] = await Promise.all([
        adminService.getDashboardService(),
        adminService.getPaymentsService(),
      ]);

      if (usersResult.EC === 0 && paymentsResult.EC === 0) {
        res.render("admin/dashboard", {
          users: usersResult.DT.users,
          payments: paymentsResult.DT,
          admin: usersResult.DT.admin,
        });
      } else {
        res.status(500).send("Server Error");
      }
    } catch (error) {
      console.error("Dashboard controller error:", error);
      res.status(500).send("Server Error");
    }
  },

  createUser: async (req, res) => {
    try {
      const serviceResult = await adminService.createUserService(req.body);
      if (serviceResult.EC === 0) {
        res.redirect("/admin/dashboard");
      } else {
        res.status(500).json({ error: serviceResult.EM });
      }
    } catch (error) {
      console.error("Create user controller error:", error);
      res.status(500).json({ error: "Error creating user" });
    }
  },

  updateUser: async (req, res) => {
    try {
      const serviceResult = await adminService.updateUserService(
        req.params.id,
        req.body
      );
      if (serviceResult.EC === 0) {
        res.redirect("/admin/dashboard");
      } else {
        res.status(500).json({ error: serviceResult.EM });
      }
    } catch (error) {
      console.error("Update user controller error:", error);
      res.status(500).json({ error: "Error updating user" });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const serviceResult = await adminService.deleteUserService(req.params.id);
      if (serviceResult.EC === 0) {
        res.redirect("/admin/dashboard");
      } else {
        res.status(500).json({ error: serviceResult.EM });
      }
    } catch (error) {
      console.error("Delete user controller error:", error);
      res.status(500).json({ error: "Error deleting user" });
    }
  },
};

module.exports = adminController;
