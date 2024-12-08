import express from "express";
import {
    getAllPosts,
    getPostsByUser,
    getPost,
    createPost,
    updatePost,
    deletePost,
    getPostsByJob,
    likePost,
    commentPost
} from "../controllers/PostControllers.js";
import { protectMiddleware } from "../middleware/authMiddleware.js"; // Import `authMiddleware`.

const router = express.Router();

// Add `protectMiddleware` to the POST route
router.route("/").get(getAllPosts).post(protectMiddleware, createPost);
router.route("/:id").get(getPost).put(protectMiddleware, updatePost).delete(protectMiddleware, deletePost);
router.route("/user/:id").get(getPostsByUser);
router.route("/job/:jobId").get(getPostsByJob); // Retrieve all posts based on `jobId`.
router.route('/post/:id').get(getPost);// Retrieve a single post based on `postId`.
router.route('/likePost/:id').post(likePost);// Support this post.
router.route('/commentPost/:id').post(commentPost);// Support this post.
export default router;
