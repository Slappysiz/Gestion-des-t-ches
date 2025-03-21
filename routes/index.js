import express from 'express';
import HomeController from '../controllers/homeController.js';

const router = express.Router();

// Route pour la page d'accueil principale
router.get('/', HomeController.renderHomePage);

export default router;
