import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
} from '../controllers/userControllers';
import authenticateUser from '../middlewares/auth/auth';

const router = express.Router();

router
  .route('/profile')
  .get(authenticateUser, getUserProfile)
  .patch(authenticateUser, updateUserProfile);

router.route('/update-password').patch(authenticateUser, updateUserPassword);

export default router;