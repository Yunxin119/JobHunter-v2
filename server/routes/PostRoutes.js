import express from 'express';
import { getAllPosts, getPostsByUser, getPost, createPost, updatePost, deletePost } from '../controllers/PostControllers.js';
import { protectMiddleware, vipMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();
// router.route('/').get(protectedMiddleware, adminMiddleware, getAllPosts).post(protectedMiddleware, vipMiddleware, createPost);
router.route('/').get(getAllPosts).post(protectMiddleware, createPost);
router.route('/:id').get(getPost).put(updatePost).delete(protectMiddleware,deletePost);
router.route('/user/:id').get(getPostsByUser);

// NOTE: 
// post feature is only for vip users
// only the vip user themselves/admin can delete their posts, only vip users can edit their posts
// only vip users can view the posts in user profile

export default router;
