const { userService, authService} = require("../service/user");

const createUser = async (req, res) => {
    try {
        const { email, ...userData } = req.body;
        const existingUser = await userService.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        await userService.createUser({ email, ...userData });
        return res.status(201).json({ message: "User created successfully", permission: true });

    } catch (error) {
        console.error("Error creating user:", error.message, error.stack);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
    
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await authService.login(email, password);
        return res.json(data);
    } catch (error) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
};

const refreshToken = async (req, res) => {
    try {
        const { token } = req.body;
        const newToken = await authService.refreshToken(token);
        return res.json({ token: newToken });
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = { createUser, login, refreshToken };
