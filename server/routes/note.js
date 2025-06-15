import express from 'express';
import userController from '../controllers/user.controller.js';
import middleware from '../middleware/middleware.js';

const router = express.Router();

router.post('/add', middleware, userController.addNote);
router.get('/',middleware, userController.getNote);
router.put('/:id', middleware, userController.updateNote); 
router.delete('/:id', middleware, userController.deleteNote); 

export default router;
