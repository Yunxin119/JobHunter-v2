import express from 'express';
const router = express.Router();
import { getAllUsers, register, login, logout } from '../controllers/UserControllers.js';

router.route('/').get(getAllUsers)
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').post(logout)

export default router;