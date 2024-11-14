import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateTokenAndCookie from "../middleware/generateTokenAndCookie.js";

// Function to get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ users: users.map(user => user.toJSON()) });
    } catch (error) {
        res.status(500).json({ msg: "Failed to fetch users" });
    }
};

// Register a new user
export const register = async (req, res) => {
    try {
        const { username, password, confirmPassword, email } = req.body;

        if (await User.findOne({ username })) {
            return res.status(400).json({ msg: "User already exists" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ msg: "Passwords do not match" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            passwordHash: hashedPassword
        });

        await newUser.save();

        const accessToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "30m" });
        res.status(201).json({
            username: newUser.username,
            email: newUser.email,
            token: accessToken
        });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Login an existing user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ msg: "User not found" });

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) return res.status(401).json({ msg: "Invalid email or password" });

        generateTokenAndCookie(user._id, res);
        res.status(200).json({ username: user.username, email: user.email });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Logout user
export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ msg: "Successfully logged out" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Get user profile
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ msg: "User not found" });

        res.status(200).json(user.toJSON());
    } catch (error) {
        res.status(500).json({ msg: "Failed to retrieve user profile" });
    }
};

// Edit user profile
export const editProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ msg: "User not found" });

        const { username, email, password, confirmPassword } = req.body;

        user.username = username || user.username;
        user.email = email || user.email;

        if (password) {
            if (password !== confirmPassword) {
                return res.status(400).json({ msg: "Passwords do not match" });
            }
            user.passwordHash = await bcrypt.hash(password, 10);
        }

        await user.save();

        generateTokenAndCookie(user._id, res);
        res.status(200).json({
            username: user.username,
            email: user.email
        });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};