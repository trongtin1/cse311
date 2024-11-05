require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const createUserService = async (name, email, password) => {
  try {
    //check user exist
    const user = await User.findOne({ email });
    if (user) {
      console.log("user exist");
      return null;
    }
    //hash user password
    const hashPassword = await bcrypt.hash(password, saltRounds);
    //save user to database
    let result = await User.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const loginService = async (email, password) => {
  try {
    //fetch user by email
    const user = await User.findOne({ email: email });
    if (user) {
      //compare password
      const isMatchPassword = await bcrypt.compare(password, user.password);
      if (isMatchPassword == false) {
        return {
          EC: 2,
          EM: "email, password khong hop le",
        };
      } else {
        //create access token
        const payload = {
          email: user.email,
          name: user.name,
        };
        const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });
        return {
          EC: 0,
          access_token,
          user: {
            email: user.email,
            name: user.name,
          },
        };
      }
    } else {
      return {
        EC: 1,
        EM: "email/password khong hop le",
      };
    }
  } catch (error) {
    console.log(error);
    return null;
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
      console.log("User exists");
      return true; // Trả về true nếu user tồn tại
    }
    return false; // Trả về false nếu không tìm thấy
  } catch (error) {
    console.error(error);
    throw error;
  }
};
module.exports = {
  createUserService,
  loginService,
  getUserService,
  checkUserService,
};
