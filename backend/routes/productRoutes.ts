import express from 'express';
import {
  createProduct,
  getAllProducts,
  getCurrentUserProducts,
  getSingleProduct,
} from '../controllers/productControllers';
import authenticateUser from '../middlewares/auth/auth';

const router = express.Router();

router.route('/').post(authenticateUser, createProduct).get(getAllProducts);
router.route('/myproducts').get(authenticateUser, getCurrentUserProducts);
router.route('/:id').get(getSingleProduct);

export default router;
