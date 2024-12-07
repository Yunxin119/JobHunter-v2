import express from "express";
import {
    getAllPosts,
    getPostsByUser,
    getPost,
    createPost,
    updatePost,
    deletePost,
    getPostsByJob,
} from "../controllers/PostControllers.js";
import { protectMiddleware } from "../middleware/authMiddleware.js"; // 导入 authMiddleware

const router = express.Router();

// 添加 protectMiddleware 到 POST 路由
router.route("/").get(getAllPosts).post(protectMiddleware, createPost);
router.route("/:id").get(getPost).put(protectMiddleware, updatePost).delete(protectMiddleware, deletePost);
router.route("/user/:id").get(getPostsByUser);
router.route("/job/:jobId").get(getPostsByJob); // 根据 jobId 获取所有 posts


export default router;
