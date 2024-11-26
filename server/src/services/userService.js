require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const createUserService = async (userData) => {
  try {
    if (!userData || !userData.email) {
      return {
        EC: 1,
        EM: "Invalid user data provided",
        DT: null,
      };
    }
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      return {
        EC: 1,
        EM: "User with this email already exists",
        DT: existingUser,
      };
    }
    // Hash password if provided
    if (userData.password) {
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
      userData.password = hashedPassword;
    }
    const user = await User.create({
      email: userData.email,
      name: userData.name,
      password: userData.password,
    });
    return {
      EC: 0,
      EM: "User created successfully",
      DT: user,
    };
  } catch (error) {
    console.error("Error in createUserService:", error);
    return {
      EC: -1,
      EM: "Database error while creating user",
      DT: null,
    };
  }
};
const loginService = async (email, password) => {
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return {
          EC: 2,
          EM: "Email/Password is incorrect",
        };
      } else {
        return {
          EC: 0,
          EM: "Login successful",
          DT: user,
          access_token: jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          }),
        };
      }
    } else {
      return {
        EC: 1,
        EM: "Email/Password is incorrect",
      };
    }
  } catch (error) {
    console.error("Error in loginService:", error);
    return {
      EC: -1,
      EM: "Error during login",
      DT: null,
    };
  }
};
const getUserService = async () => {
  try {
    const users = await User.find({}).select("-password");
    return {
      EC: 0,
      EM: "Get users successful",
      DT: users,
    };
  } catch (error) {
    console.error("Error in getUserService:", error);
    return {
      EC: -1,
      EM: "Error fetching users",
      DT: null,
    };
  }
};
const checkUserService = async (email) => {
  const user = await User.findOne({ email: email });
  if (user) {
    return {
      EC: 1,
      EM: "Email already exists",
    };
  } else {
    return {
      EC: 0,
      EM: "Email is available",
    };
  }
};
module.exports = {
  createUserService,
  loginService,
  getUserService,
  checkUserService,
};
