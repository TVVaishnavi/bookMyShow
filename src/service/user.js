const User = require("../model/user");
const bcrypt = require("bcrypt");
const { verifyToken } = require("../middleware/authentication");
const jwtToken = require("../config/jwtToken");

const getUsers = async () => await User.find({});

const createUser = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await new User({ name, email, password: hashedPassword }).save();
};

const login = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid Credentials");
    }
    const token = await jwtToken.generateToken(user);
    return user.role === "admin" ? { role: user.role, token } : { token };
  } catch (error) {
    throw new Error(error.message || "Login failed");
  }
};

const refreshToken = async (oldToken) => {
  try {
    const decoded = jwt.verify(oldToken,jwtToken.secretKey);
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error('User not found');
    }
    const newToken = await jwtToken.generateToken(user);
    return newToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw new Error("Invalid token");
  }
};

module.exports = { getUsers, createUser, login, refreshToken };
