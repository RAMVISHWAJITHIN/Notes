import express from 'express';
import userController from '../controllers/user.controller.js'; // this imports the default object

const router = express.Router();

router.post('/register', userController.createUser);
router.post('/login', userController.logUser);

export default router;