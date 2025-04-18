import express from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { addUser, getUserByEmail } from '../models/user.js';
import { isEmailValid, isPasswordValid, validateDescription } from '../utils/validation.js';

const router = express.Router();

// Affiche la page de connexion
router.get('/login', (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.render('login', { title: 'Connexion' });
});

// Affiche la page d'inscription
router.get('/register', (req, res) => {
  res.render('register', { title: 'Inscription' });
});

// Traite la connexion
router.post('/login', (req, res, next) => {
  
  console.log("Email reçu:", req.body.email);
  console.log("Password reçu:", req.body.password);

  if (isEmailValid(req.body.email) && isPasswordValid(req.body.password)) {
    passport.authenticate('local', (error, user, info) => {
      if (error) return next(error);
      if (!user) return res.status(401).json(info);
      req.logIn(user, (error) => {
        if (error) return next(error);
        return res.redirect('/');
      });
    })(req, res, next);
  } else {
    return res.status(400).json({ error: 'Email ou mot de passe invalide' });
  }
});

// Traite la déconnexion
router.post('/deconnexion', (req, res, next) => {
  req.logOut((error) => {
    if (error) return next(error);
    return res.redirect('/auth/login');  
  });
});

// Traite l'inscription
router.post('/inscription', async (req, res, next) => {
  try {
    const { username, nom, prenom, email, password, confirmPassword } = req.body;

    // Vérifie que les mots de passe correspondent
    if (password !== confirmPassword) {
      return res.status(400).render('register', {
        title: 'Inscription',
        error: 'Les mots de passe ne correspondent pas',
      });
    }

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).render('register', {
        title: 'Inscription',
        error: 'Cet email est déjà utilisé',
      });
    }

    const newUser = await addUser(email, password, nom);

    // Connecte automatiquement l'utilisateur
    req.logIn(newUser, (error) => {
      if (error) return next(error);
      req.session.successMessage = "Votre compte a été créé avec succès";
      return res.redirect('/');
    });
  } catch (error) {
    return res.status(400).render('register', { title: 'Inscription', error: error.message });
  }
});

// Middleware de validation pour les tâches
export const validateTask = (req, res, next) => {
  const { title, priority, status, dueDate } = req.body;
  const errors = {};

  if (!title || title.trim() === '') {
    errors.title = 'Le titre est obligatoire';
  } else if (title.length > 100) {
    errors.title = 'Le titre ne doit pas dépasser 100 caractères';
  }

  if (priority && !['FAIBLE', 'MOYENNE', 'ELEVEE'].includes(priority)) {
    errors.priority = 'Priorité invalide';
  }

  if (status && !['A_FAIRE', 'EN_COURS', 'EN_REVISION', 'TERMINEE'].includes(status)) {
    errors.status = 'Statut invalide';
  }

  if (dueDate && isNaN(Number(dueDate))) {
    errors.dueDate = 'La date limite doit être un timestamp valide';
  }

  if (Object.keys(errors).length > 0) {
    if (req.xhr || (req.headers.accept && req.headers.accept.includes('json'))) {
      return res.status(400).json({ errors });
    }
    return res.status(400).render('tasks/edit', {
      title: req.originalUrl.includes('create') ? 'Créer une nouvelle tâche' : 'Modifier la tâche',
      task: req.body,
      errors,
      action: req.originalUrl,
      priorities: ['FAIBLE', 'MOYENNE', 'ELEVEE'],
      statuses: ['A_FAIRE', 'EN_COURS', 'EN_REVISION', 'TERMINEE'],
    });
  }
  next();
};

export const validateStatus = (req, res, next) => {
  const { status } = req.body;
  if (!status) return res.status(400).json({ error: 'Le statut est obligatoire' });
  if (!['A_FAIRE', 'EN_COURS', 'EN_REVISION', 'TERMINEE'].includes(status)) {
    return res.status(400).json({ error: 'Statut invalide' });
  }
  next();
};

export default router;
