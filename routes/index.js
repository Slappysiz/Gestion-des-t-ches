import express from 'express';
import TaskController from '../controllers/taskController.js';

const router = express.Router();

// La page d'accueil est maintenant le tableau de tâches
router.get('/', TaskController.renderTasksList);

export default router;