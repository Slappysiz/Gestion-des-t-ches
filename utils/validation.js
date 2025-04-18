/**
 * Vérifie si l'email a un format valide.
 * @param {string} email - L'email à valider.
 * @returns {boolean} - True si l'email est valide, false sinon.
 */
export const isEmailValid = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  
  /**
   * Vérifie si le mot de passe est valide.
   * @param {string} password - Le mot de passe à valider.
   * @returns {boolean} - True si le mot de passe est valide, false sinon.
   */
  export const isPasswordValid = (password) => {
    return typeof password === 'string' && password.trim().length >= 5;
  };
  
  /**
   * Vérifie si une description est valide.
   * @param {string} description - La description à valider.
   * @returns {boolean} - True si la description est valide, false sinon.
   */
  export const validateDescription = (description) => {
    return description.length <= 500;
  };
  
  // Validation pour la création et la mise à jour des tâches
  export const validateTask = (req, res, next) => {
    const { title, priority, status, dueDate } = req.body;
    const errors = {};
  
    // Validation du titre
    if (!title || title.trim() === '') {
      errors.title = 'Le titre est obligatoire';
    } else if (title.length > 100) {
      errors.title = 'Le titre ne doit pas dépasser 100 caractères';
    }
  
    // Validation de la priorité
    if (priority && !['FAIBLE', 'MOYENNE', 'ELEVEE'].includes(priority)) {
      errors.priority = 'La priorité doit être FAIBLE, MOYENNE ou ELEVEE';
    }
  
    // Validation du statut
    if (status && !['A_FAIRE', 'EN_COURS', 'EN_REVISION', 'TERMINEE'].includes(status)) {
      errors.status = 'Le statut doit être A_FAIRE, EN_COURS, EN_REVISION ou TERMINEE';
    }
  
    // Validation de la date limite (doit être un nombre)
    if (dueDate && isNaN(Number(dueDate))) {
      errors.dueDate = 'La date limite doit être un timestamp valide';
    }
  
    if (Object.keys(errors).length > 0) {
      // Pour les requêtes API
      if (req.xhr || (req.headers.accept && req.headers.accept.indexOf('json') > -1)) {
        return res.status(400).json({ errors });
      }
      // Pour les requêtes de formulaire
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
  
  // Validation pour la mise à jour du statut d'une tâche
  export const validateStatus = (req, res, next) => {
    const { status } = req.body;
  
    if (!status) {
      return res.status(400).json({ error: 'Le statut est obligatoire' });
    }
  
    if (!['A_FAIRE', 'EN_COURS', 'EN_REVISION', 'TERMINEE'].includes(status)) {
      return res.status(400).json({ error: 'Statut invalide' });
    }
  
    next();
  };
  