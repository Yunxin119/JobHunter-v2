import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    username: {
        type: String,
        ref: 'Post'
    },
    profilePic: {
        type: String,
        ref: 'Post'
    }
});

export default mongoose.model("Comment", CommentSchema);