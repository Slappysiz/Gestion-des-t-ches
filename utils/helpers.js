/**
 * Fonctions utilitaires pour l'application
 */

// Formatage des dates (timestamp EPOCH en millisecondes vers date lisible)
export const formatDate = (timestamp) => {
    if (!timestamp) return '';

    // Convertir BigInt en String si nécessaire
    const timestampValue = typeof timestamp === 'bigint' ? timestamp.toString() : timestamp;

    const date = new Date(Number(timestampValue));
    return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

// Formatage des dates pour les champs input type="date"
export const formatDateInput = (timestamp) => {
    if (!timestamp) return '';

    // Convertir BigInt en String si nécessaire
    const timestampValue = typeof timestamp === 'bigint' ? timestamp.toString() : timestamp;

    const date = new Date(Number(timestampValue));
    return date.toISOString().split('T')[0];
};

// Obtenir le timestamp EPOCH actuel en millisecondes
export const getCurrentTimestamp = () => {
    return Date.now();
};

// Vérifier si une date est dépassée
export const isDatePassed = (timestamp) => {
    if (!timestamp) return false;

    // Convertir BigInt en String si nécessaire
    const timestampValue = typeof timestamp === 'bigint' ? timestamp.toString() : timestamp;

    const date = new Date(Number(timestampValue));
    const now = new Date();

    // Comparer les dates sans prendre en compte l'heure
    const dateWithoutTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const nowWithoutTime = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return dateWithoutTime < nowWithoutTime;
};

// Calculer le temps restant jusqu'à une date
export const getTimeRemaining = (timestamp) => {
    if (!timestamp) return '';

    // Convertir BigInt en String si nécessaire
    const timestampValue = typeof timestamp === 'bigint' ? timestamp.toString() : timestamp;

    const date = new Date(Number(timestampValue));
    const now = new Date();

    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
        return `En retard de ${Math.abs(diffDays)} jour(s)`;
    } else if (diffDays === 0) {
        return 'Aujourd\'hui';
    } else if (diffDays === 1) {
        return 'Demain';
    } else {
        return `Dans ${diffDays} jour(s)`;
    }
};

// Conversion du statut en texte lisible
export const getStatusText = (status) => {
    const statusMapping = {
        'A_FAIRE': 'À faire',
        'EN_COURS': 'En cours',
        'EN_REVISION': 'En révision',
        'TERMINEE': 'Terminée'
    };

    return statusMapping[status] || status;
};

// Conversion de la priorité en texte lisible
export const getPriorityText = (priority) => {
    const priorityMapping = {
        'FAIBLE': 'Faible',
        'MOYENNE': 'Moyenne',
        'ELEVEE': 'Élevée'
    };

    return priorityMapping[priority] || priority;
};

// Génération de classes CSS pour les priorités
export const getPriorityClass = (priority) => {
    const priorityClasses = {
        'FAIBLE': 'bg-blue-100 text-blue-800',
        'MOYENNE': 'bg-yellow-100 text-yellow-800',
        'ELEVEE': 'bg-red-100 text-red-800'
    };

    return priorityClasses[priority] || 'bg-gray-100 text-gray-800';
};

// Génération de classes CSS pour les statuts
export const getStatusClass = (status) => {
    const statusClasses = {
        'A_FAIRE': 'bg-gray-100 text-gray-800',
        'EN_COURS': 'bg-blue-100 text-blue-800',
        'EN_REVISION': 'bg-purple-100 text-purple-800',
        'TERMINEE': 'bg-green-100 text-green-800'
    };

    return statusClasses[status] || 'bg-gray-100 text-gray-800';
};

// Validation d'un objet task
export const validateTask = (task) => {
    const errors = {};

    if (!task.title || task.title.trim() === '') {
        errors.title = 'Le titre est obligatoire';
    }

    if (task.title && task.title.length > 100) {
        errors.title = 'Le titre ne doit pas dépasser 100 caractères';
    }

    if (task.priority && !['FAIBLE', 'MOYENNE', 'ELEVEE'].includes(task.priority)) {
        errors.priority = 'La priorité doit être FAIBLE, MOYENNE ou ELEVEE';
    }

    if (task.status && !['A_FAIRE', 'EN_COURS', 'EN_REVISION', 'TERMINEE'].includes(task.status)) {
        errors.status = 'Le statut doit être A_FAIRE, EN_COURS, EN_REVISION ou TERMINEE';
    }

    if (task.dueDate && isNaN(Number(task.dueDate))) {
        errors.dueDate = 'La date limite doit être un timestamp valide';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

// Conversion d'une date en timestamp EPOCH
export const dateToTimestamp = (dateString) => {
    if (!dateString) return null;

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;

    return date.getTime();
};

// Conversion d'un timestamp EPOCH en objet Date
export const timestampToDate = (timestamp) => {
    if (!timestamp) return null;

    // Convertir BigInt en String si nécessaire
    const timestampValue = typeof timestamp === 'bigint' ? timestamp.toString() : timestamp;

    return new Date(Number(timestampValue));
};