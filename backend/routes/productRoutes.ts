import express from 'express';
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
} from '../controllers/productControllers';

const router = express.Router();

router.route('/').post(createProduct).get(getAllProducts);
router.route('/:id').get(getSingleProduct);

export default router;
