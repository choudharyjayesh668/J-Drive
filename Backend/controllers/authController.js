const User = require("../models/user");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const signup = async (req, res) => {
    try {
        let { email, password, username } = req.body;
        if (!username || !username.trim()) {
            return res.status(400).json({
                message: "Username is Required",
            });
        }
        if (!email || !email.trim()) {
            return res.status(400).json({
                message: "Email is Required",
            });
        }
        if (!password) {
            return res.status(400).json({
                message: "Password is Required",
            });
        }
        username = username.trim();
        email = email.trim().toLowerCase();
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "User Already Exists",
            });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashPassword,
        });
        await newUser.save();
        return res.status(201).json({
            message: "User Created Successfully",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email.trim().toLowerCase();
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({
                message: "Invalid Email or Password",
            });
        }
        const passwordMatch = await bcrypt.compare(
            password,
            existingUser.password
        );
        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid Email or Password",
            });
        }
        const token = JWT.sign(
            { userId: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({
            message: "Access Granted",
        });
    } catch (err) {
        console.error("LOGIN ERROR:", err);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });
    return res.status(200).json({
        message: "Logged out successfully",
    });
};

const verify = (req, res) => {
    return res.status(200).json({
        authenticated: true,
    });
};

module.exports = {
    signup,
    login,
    logout,
    verify
};