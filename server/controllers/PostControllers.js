import Post from "../models/PostModel";
import User from "../models/UserModel";
import Comment from "../models/CommentModel";

// Function to get all posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).populate("userId", "username profilePic").populate("comments");
        res.status(200).json({ posts });
    } catch (error) {
        res.status(500).json({ msg: "Failed to fetch posts" });
    }
};

// Function to get a single post
export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("userId", "username profilePic").populate("comments");
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }
        res.status(200).json({ post });
    } catch (error) {
        res.status(500).json({ msg: "Failed to fetch post" });
    }
};

// Function to create a post
export const createPost = async (req, res) => {
    const { title, content } = req.body;
    try {
        const post = await Post.create({ title, content, userId: req.user._id });
        res.status(201).json({ post });
    } catch (error) {
        res.status(500).json({ msg: "Failed to create post" });
    }
};

// Function to update a post
export const updatePost = async (req, res) => {
    const { title, content } = req.body;
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }
        if (post.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ msg: "You are not authorized to edit this post" });
        }
        post.title = title || post.title;
        post.content = content || post.content;
        await post.save();
        res.status(200).json({ post });
    } catch (error) {
        res.status(500).json({ msg: "Failed to update post" });
    }
};

// Function to delete a post
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }
        if (post.userId.toString() !== req.user._id.toString() && req.user.role !== "Admin") {
            return res.status(401).json({ msg: "You are not authorized to delete this post" });
        }
        await post.remove();
        res.status(200).json({ msg: "Post deleted" });
    } catch (error) {
        res.status(500).json({ msg: "Failed to delete post" });
    }
};

// Function to like a post
export const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }
        if (post.likes.includes(req.user._id)) {
            return res.status(400).json({ msg: "You have already liked this post" });
        }
        post.likes.push(req.user._id);
        await post.save();
        res.status(200).json({ post });
    } catch (error) {
        res.status(500).json({ msg: "Failed to like post" });
    }
};

// Function to unlike a post
export const unlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }
        if (!post.likes.includes(req.user._id)) {
            return res.status(400).json({ msg: "You have already unliked this post" });
        }
        post.likes = post.likes.filter((like) => like.toString() !== req.user._id.toString());
        await post.save();
        res.status(200).json({ post });
    } catch (error) {
        res.status(500).json({ msg: "Failed to unlike post" });
    }
};