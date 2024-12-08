import express from 'express';
const router = express.Router();
import { protectMiddleware } from '../middleware/authMiddleware.js';
import { getCommentsByUser, getCommentsByPost, addComment, deleteComment, deleteCommentsByPost } from '../controllers/CommentControllers.js';

router.route('/user/:uid').get(protectMiddleware, getCommentsByUser);
router.route('/post/:pid').get(protectMiddleware, getCommentsByPost).post(protectMiddleware, addComment).delete(protectMiddleware, deleteCommentsByPost);
router.route('/:id').delete(protectMiddleware, deleteComment);

export default router;