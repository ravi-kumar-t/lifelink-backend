const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (data) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    ...data,
    password: hashedPassword
  });

  const userObj = user.toObject();
  delete userObj.password;

  return userObj;
};

exports.loginUser = async (data) => {
  const user = await User.findOne({ email: data.email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  const userObj = user.toObject();
  delete userObj.password;

  return { user: userObj, token };
};