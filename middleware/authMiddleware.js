export function requireAuth(req, res, next) {
    // Passport ajoute isAuthenticated() à req
    if (req.isAuthenticated && req.isAuthenticated()) {
      return next(); // OK, l'utilisateur est connecté
    }
    // Sinon, on redirige vers la page de login
    return res.redirect('/auth/login');
  }
