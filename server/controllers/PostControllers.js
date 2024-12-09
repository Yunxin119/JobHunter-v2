import Post from "../models/PostModel.js";
import User from "../models/UserModel.js";
import Comment from "../models/CommentModel.js";

// Function to get all posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).populate("userId", "username profilePic").populate("comments");
        res.status(200).json({ posts });
    } catch (error) {
        res.status(500).json({ msg: "Failed to fetch posts" });
    }
};

// Function to get all posts by a user
export const getPostsByUser = async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.params.id }).populate("userId", "username profilePic").populate("comments");
        res.status(200).json({ posts });
    } catch (error) {
        res.status(500).json({ msg: "Failed to fetch posts" });
    }
};

// Function to get a single post
export const getPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id).populate("userId", "username profilePic");
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
    const { title, content, jobId, userId } = req.body;

    if (!jobId || !userId || !content) {
        return res.status(400).json({ msg: "Job ID, User ID, and content are required." });
    }

    try {
        const post = await Post.create({
            title,
            content,
            userId,
            jobId,
        });

        const user = await User.findById(userId);
        if (user) {
            user.posts.push(post._id);
            await user.save();
        }

        res.status(201).json({ post });
    } catch (error) {
        console.error("Error creating post:", error.message);
        res.status(500).json({ msg: "Failed to create post." });
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
        if (post.userId.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return res.status(401).json({ msg: "You are not authorized to delete this post" });
        }
        await Post.deleteOne({ _id: req.params.id });
        await Comment.deleteMany({ postId: req.params.id });
        const user = await User.findById(req.user._id);
        user.posts = user.posts.filter((postId) => postId.toString() !== req.params.id);
        await user.save();
        res.status(200).json({ msg: "Post deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Failed to delete post" });
    }
};

// Function to like a post
export const likePost = async (req, res) => {
    const { user, postId } = req.body;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }
        if (post.likes.includes(user._id)) {
            return res.status(400).json({ msg: "You have already liked this post" });
        }
        post.likes.push(user._id);
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

export const getPostsByJob = async (req, res) => {
    const { jobId } = req.params; // get jobId
    console.log("Fetching posts for jobId:", jobId);

    try {
        // Query all posts related to `jobId` and populate the basic information of `userId`.
        const posts = await Post.find({ jobId })
            .populate("userId", "username profilePic")
            .populate("comments");

        if (!posts) {
            return res.status(404).json({ msg: "No posts found for this job." });
        }

        res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error.message);
        res.status(500).json({ msg: "Failed to fetch posts." });
    }
};
export const commentPost = async (req,res)=>{
    
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }
        const comment = new Comment({
            content:req.body.comment,
            userId: req.body.user._id,
            postId: req.params.id,
            username:req.body.user.username,
            profilePic:req.body.user.profilePic
        });
        await comment.save();
        post.comments.push(comment._id.toString());
        await post.save();
        res.status(200).json({ post });
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Failed to comment this post" });
    }
}