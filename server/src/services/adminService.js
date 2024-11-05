const jwt = require("jsonwebtoken");
const ADMIN_CONFIG = require("../config/admin");
const User = require("../models/user");

const adminService = {
  loginService: async (username, password) => {
    try {
      if (
        username !== ADMIN_CONFIG.username ||
        password !== ADMIN_CONFIG.password
      ) {
        return {
          EC: 1,
          EM: "Invalid username or password",
          DT: "",
        };
      }

      const payload = {
        username: username,
        isAdmin: true,
      };
      const token = jwt.sign(
        payload,
        process.env.JWT_SECRET || "default-secret-key",
        { expiresIn: "1d" }
      );

      return {
        EC: 0,
        EM: "Login successful",
        DT: {
          access_token: token,
          userData: {
            username: username,
            isAdmin: true,
          },
        },
      };
    } catch (error) {
      console.log(error);
      return {
        EC: -1,
        EM: "Something wrong in service...",
        DT: "",
      };
    }
  },

  getDashboardService: async () => {
    try {
      const users = await User.find({}).sort({ createdAt: -1 });
      return {
        EC: 0,
        EM: "Get dashboard data successful",
        DT: { users, admin: { username: ADMIN_CONFIG.username } },
      };
    } catch (error) {
      console.error("Dashboard service error:", error);
      return {
        EC: -1,
        EM: "Error getting dashboard data",
        DT: null,
      };
    }
  },

  createUserService: async (userData) => {
    try {
      const user = new User(userData);
      await user.save();
      return {
        EC: 0,
        EM: "User created successfully",
        DT: user,
      };
    } catch (error) {
      console.error("Create user service error:", error);
      return {
        EC: -1,
        EM: "Error creating user",
        DT: null,
      };
    }
  },

  updateUserService: async (id, userData) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(id, userData, {
        new: true,
      });
      return {
        EC: 0,
        EM: "User updated successfully",
        DT: updatedUser,
      };
    } catch (error) {
      console.error("Update user service error:", error);
      return {
        EC: -1,
        EM: "Error updating user",
        DT: null,
      };
    }
  },

  deleteUserService: async (id) => {
    try {
      await User.findByIdAndDelete(id);
      return {
        EC: 0,
        EM: "User deleted successfully",
        DT: null,
      };
    } catch (error) {
      console.error("Delete user service error:", error);
      return {
        EC: -1,
        EM: "Error deleting user",
        DT: null,
      };
    }
  },
};

module.exports = adminService;
