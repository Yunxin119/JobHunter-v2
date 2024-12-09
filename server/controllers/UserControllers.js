import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateTokenAndCookie from "../middleware/generateTokenAndCookie.js";
import Comment from "../models/CommentModel.js";
import Post from "../models/PostModel.js";
import Company from "../models/CompanyModel.js";

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
        const { username, password, confirmPassword, email, gender, role } = req.body;
        console.log("Logging User's Role: ", role);

        if (await User.findOne({ username })) {
            return res.status(400).json({ msg: "User already exists" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ msg: "Passwords do not match" });
        }

        const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const profilePic = `https://avatar.iran.liara.run/public/username=${username}`;

        // Create new user instance
        const newUser = new User({
            username,
            email,
            gender,
            role,
            profilePic: gender === "male" ? maleProfilePic : gender === "female" ? femaleProfilePic : profilePic
        });

        // Set the hashed password using the method defined in the schema
        await newUser.setPassword(password);

        // Save the new user
        await newUser.save();

        const token = generateTokenAndCookie(newUser._id, res);
        
        res.status(201).json(newUser.toJSON());
    } catch (error) {
        console.log(error);
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

        const token = generateTokenAndCookie(user._id, res);
        console.log("User logged in");
        res.status(200).json(user.toJSON());
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
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ msg: "User not found" });
        console.log("User profile retrieved");
        res.status(200).json(user.toJSON());
    } catch (error) {
        res.status(500).json({ msg: "Failed to retrieve user profile" });
    }
};

// Edit user profile
export const editProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        console.log(user);
        if (!user) return res.status(404).json({ msg: "User not found" });

        const { username, email, password, confirmPassword, gender, role } = req.body;

        user.username = username || user.username;
        user.email = email || user.email;
        if (user.gender !== gender) {
            gender === "male" ? user.profilePic = `https://avatar.iran.liara.run/public/boy?username=${username}` :
            gender === "female" ? user.profilePic = `https://avatar.iran.liara.run/public/girl?username=${username}` :
            user.profilePic = `https://avatar.iran.liara.run/public/username=${username}`
        }
        user.gender = gender || user.gender;

        if (role) {
            const validRoles = ["admin", "user", "superuser"];
            if (!validRoles.includes(role)) {
                return res.status(400).json({ msg: `Invalid role. Valid roles are: ${validRoles.join(", ")}` });
            }
            user.role = role;
        }

        if (password) {
            if (password !== confirmPassword) {
                return res.status(400).json({ msg: "Passwords do not match" });
            }
            user.passwordHash = await bcrypt.hash(password, 10);
        }

        await user.save();

        const token = generateTokenAndCookie(user._id, res);
        res.status(200).json(user.toJSON());
    } catch (error) {
        res.status(400).json({ msg: error.message });
        console.log(error);
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ msg: "User not found" });
        await User.deleteOne({ _id: id });
        await Post.deleteMany({ userId: id });
        await Comment.deleteMany({ userId: id });
        await Company.deleteMany({ user_id: id });
    
        res.status(200).json({ msg: "User deleted" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};