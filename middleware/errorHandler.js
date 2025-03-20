// Middleware de gestion globale des erreurs
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Déterminer le code d'état HTTP
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

    // Répondre avec une erreur JSON pour les requêtes API
    if (req.xhr || (req.headers.accept && req.headers.accept.indexOf('json') > -1)) {
        return res.status(statusCode).json({
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
        });
    }

    // Répondre avec une page d'erreur pour les requêtes HTML
    res.status(statusCode).render('error', {
        title: 'Erreur',
        message: err.message,
        error: process.env.NODE_ENV === 'production' ? {} : err
    });
};

export default errorHandler;