const userService= require("../service/user")
const User = require("../model/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/jwtToken");

const createUser = async (req, res) => {
    try {
        console.log("Request Body:", req.body) 
        const { email, ...userData } = req.body
        if (!email) return res.status(400).json({ message: "Email is required" })
        console.log("userService:", userService)
        console.log("userService.getUserByEmail:", userService?.getUserByEmail)

        const existingUser = await userService.getUserByEmail(email)
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" })
        }

        await userService.createUser({ email, ...userData })
        return res.status(201).json({ message: "User created successfully" })
    } catch (error) {
        console.error("Error creating user:", error) 
        return res.status(500).json({ message: "Internal server error", error: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found");
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log("Password does not match");
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            secretKey,  
            { expiresIn: "1h" }
        );

        res.json({ message: "Login successful", token });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const refreshToken = async (req, res) => {
    try {
        const { token } = req.body
        const newToken = await userService.refreshToken(token)
        return res.json({ token: newToken })
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" })
    }
}

module.exports = { createUser, login, refreshToken }
