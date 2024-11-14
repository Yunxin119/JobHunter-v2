import express from 'express';
const router = express.Router();
import { protectMiddleware } from '../middleware/authMiddleware.js';
import { getCompanies, addCompany, updateCompany, deleteCompany } from '../controllers/CompanyControllers.js';

router.route('/').get(protectMiddleware, getCompanies)
router.route('/add').post(protectMiddleware, addCompany)
router.route('/:id').put(protectMiddleware, updateCompany).delete(protectMiddleware, deleteCompany)

export default router;