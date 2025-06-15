import express from 'express';
import userController from '../controllers/user.controller.js'; 
import middleware from '../middleware/middleware.js';

const router = express.Router();

router.post('/register', userController.createUser);
router.post('/login', userController.logUser);
router.get('/verify',middleware, userController.verifyUser);

export default router;