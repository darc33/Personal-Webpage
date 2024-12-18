import express from 'express';
import { registerController, loginController, recoverPasswordController } from '../controllers/usersController.js';

const router = express.Router();

router.post('/signup', registerController);
router.post('/login', loginController);
router.post('/recover-password', recoverPasswordController);

export default router;
