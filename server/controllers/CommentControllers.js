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

// Delete a comment
export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ msg: "Comment not found" });
        }
        if (comment.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ msg: "You are not authorized to delete this comment" });
        }
        await comment.remove();
        res.status(200).json({ msg: "Comment deleted" });
    } catch (error) {
        res.status(500).json({ msg: "Failed to delete comment" });
    }
};

