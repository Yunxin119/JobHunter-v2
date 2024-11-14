import express from 'express';
const router = express.Router();
import { getAllUsers, register, login, logout, getUserProfile, deleteUser, editProfile } from '../controllers/UserControllers.js';

router.route('/').get(getAllUsers)
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').post(logout)
router.route('/:id').get(getUserProfile).delete(deleteUser).put(editProfile)

export default router;