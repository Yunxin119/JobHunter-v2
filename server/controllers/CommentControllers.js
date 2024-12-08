import Comment from "../models/CommentModel.js";
import Post from "../models/PostModel.js";
import User from "../models/UserModel.js";

// Function to get all comments
export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find({}).populate("postId").populate("userId", "username profilePic");
        res.status(200).json({ comments });
    } catch (error) {
        res.status(500).json({ msg: "Failed to fetch comments" });
    }
};

// get commments by userId
export const getCommentsByUser = async (req, res) => {
    const { uid } = req.params;
    try {
        const comments = await Comment.find({ userId: uid }).populate("postId").populate("userId", "username profilePic");
        res.status(200).json({ comments });
    } catch (error) {
        res.status(500).json({ msg: "Failed to fetch comments" });
    }
};

// Add a comment to a post
export const addComment = async (req, res) => {
    try {
        const { pid } = req.params;
        console.log(pid)
        const post = await Post.findById(pid)
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }
        console.log(post)
        const { content } = req.body;
        const comment = new Comment({
            content,
            userId: req.body.user._id,
            postId: pid
        });
        await comment.save();
        post.comments.push(comment._id);
        await post.save();
        res.status(201).json({ comment });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Failed to add comment" });
    }
};

// Delete a comment
export const deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ msg: "Comment not found" });
        }
        if (comment.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ msg: "You are not authorized to delete this comment" });
        }
        await comment.deleteOne({ _id: id });
        res.status(200).json({ msg: "Comment deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Failed to delete comment" });
    }
};

// get comment by post
export const getCommentsByPost = async (req, res) => {
    console.log("Get comments by post")
    const { pid } = req.params;
    const post = await Post.findById(pid);
    if (!post) {
        return res.status(404).json({ msg: "Post not found" });
    }
    console.log(post)
    try {
        const comments = await Comment.find({ postId: pid }).populate("userId", "username profilePic");
        res.status(200).json({ comments });
    } catch (error) {
        res.status(500).json({ msg: "Failed to fetch comments" });
    }
};

