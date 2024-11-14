import express from 'express';
const router = express.Router();
import { getCompanies, addCompany, updateCompany, deleteCompany } from '../controllers/CompanyControllers.js';

router.route('/').get(getCompanies)
router.route('/add').post(addCompany)
router.route('/:id').put(updateCompany).delete(deleteCompany)

export default router;