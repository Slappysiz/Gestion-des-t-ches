import express from 'express';
import TaskController from '../controllers/taskController.js';

const router = express.Router();

// Route pour la liste des tâches
router.get('/', TaskController.renderTasksList);

// Routes pour la création
router.get('/create', TaskController.renderCreateTaskForm);
router.post('/create', TaskController.createTask);

// Routes pour l'affichage des détails
router.get('/:id', TaskController.renderTaskDetails);

// Routes pour la modification
router.get('/:id/edit', TaskController.renderEditTaskForm);
router.post('/:id/update', TaskController.updateTask);

// Route pour la suppression
router.post('/:id/delete', TaskController.deleteTask);

// Route pour la mise à jour du statut (API)
router.put('/:id/status', TaskController.updateTaskStatus);

export default router;