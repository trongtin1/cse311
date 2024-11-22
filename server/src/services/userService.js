require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const createUserService = async (userData) => {
  try {
    const existingUser = await User.findOne({
      $or: [{ email: userData.email }, { clerkId: userData.clerkId }],
    });

    if (existingUser) {
      console.log("User already exists");
      return {
        success: false,
        message: "User with this email or Clerk ID already exists",
      };
    }

    const user = await User.create({
      clerkId: userData.clerkId,
      email: userData.email,
      name: `${userData.firstName} ${userData.lastName}`.trim(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      photo: userData.photo,
    });

    console.log("User created successfully:", user);
    return {
      success: true,
      data: user,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Database error while creating user");
  }
};

const loginService = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      console.log("User exists");
      return true; // Trả về true nếu user tồn tại
    }
    return false; // Trả về false nếu không tìm thấy
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserService = async () => {
  try {
    let result = await User.find({});
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const checkUserService = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      console.log("User exists in database");
      return true;
    }
    console.log("User does not exist in database");
    return false;
  } catch (error) {
    console.error("Error checking user:", error);
    throw error;
  }
};
module.exports = {
  createUserService,
  loginService,
  getUserService,
  checkUserService,
};
