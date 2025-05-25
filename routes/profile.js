import express from 'express';
import passport from 'passport';
import { getUserByEmail, getUserById, updateUser, deleteUser } from '../models/user.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Affiche la page profil (protégée par requireAuth)
router.get('/', requireAuth, async (req, res, next) => {
  try {
    // On peut utiliser req.user
    res.render('profile', { title: 'Profil', user: req.user });
  } catch (error) {
    next(error);
  }
});

// Met à jour les informations du profil
router.post('/update', requireAuth, async (req, res, next) => {
    try {
      const { username, nom, prenom, email } = req.body;
      const updatedUser = await updateUser(req.user.id, { username, nom, prenom, email });
      req.session.user = updatedUser;
      req.session.successMessage = "Votre profil a été mis à jour avec succès";
      res.redirect('/profile');
    } catch (error) {
      next(error);
    }
  });
  
  // POST /profile/delete — Supprime définitivement le compte
router.post('/delete', requireAuth, async (req, res, next) => {
  try {
    // Supprimer l’utilisateur de la base
    await deleteUser(req.user.id);

    // Détruire la session Passport + session Express
    req.logOut(err => {
      if (err) return next(err);
      req.session.destroy(err => {
        if (err) return next(err);
        // Rediriger vers la page de connexion
        res.redirect('/auth/login');
      });
    });
  } catch (error) {
    next(error);
  }
});

// FORMULAIRE d'édition
router.get('/edit', requireAuth, async (req, res, next) => {
  try {
    res.render('profile-edit', {
      title: 'Modifier mon profil',
      user: req.user
    });
  } catch (err) {
    next(err);
  }
});



  export default router;
