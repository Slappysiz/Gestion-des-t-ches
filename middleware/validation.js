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

    // Si des erreurs sont détectées, renvoyer à la page précédente avec les erreurs
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

// Validation pour la mise à jour du statut
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