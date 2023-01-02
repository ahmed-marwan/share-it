import express from 'express';
import {
  showCurrentUser,
  updateUser,
  updateUserPassword,
} from '../controllers/userControllers';
import authenticateUser from '../middlewares/auth/auth';

const router = express.Router();

router
  .route('/profile')
  .get(authenticateUser, showCurrentUser)
  .patch(authenticateUser, updateUser);

router.route('/update-password').patch(authenticateUser, updateUserPassword);

export default router;