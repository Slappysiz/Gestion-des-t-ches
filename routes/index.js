import express from 'express';
import HomeController from '../controllers/homeController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route pour la page d'accueil principale
router.get('/', requireAuth, HomeController.renderHomePage);

export default router;
