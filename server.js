import express from 'express';
import { engine } from 'express-handlebars';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';         // Gestion des sessions
import memorystore from 'memorystore';          // Stockage en mémoire pour les sessions
import passport from 'passport';                // Passport pour l'authentification
import authRoutes from './routes/auth.js';
import indexRoutes from './routes/index.js';
import tasksRoutes from './routes/tasks.js';
import profileRoutes from './routes/profile.js';
import errorHandler from './middleware/errorHandler.js';

// Configuration Passport (stratégie, serializeUser et deserializeUser)
import './config/authentification.js';

// Initialisation de l'application
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware de sécurité et autres
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "script-src": ["'self'", "'unsafe-inline'", "cdn.tailwindcss.com", "unpkg.com"],
      "style-src": ["'self'", "'unsafe-inline'", "cdn.tailwindcss.com", "fonts.googleapis.com"],
      "font-src": ["'self'", "fonts.gstatic.com"],
      "img-src": ["'self'", "data:"],
    },
  },
}));
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configuration des sessions et de Passport
const MemoryStore = memorystore(session);
app.use(session({
  cookie: { maxAge: 3600000 },
  name: process.env.npm_package_name,
  store: new MemoryStore({ checkPeriod: 3600000 }),
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
}));

// Initialiser Passport après la session
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// Configuration du moteur de templates Handlebars
app.engine('handlebars', engine({
  helpers: {
    formatDate: (timestamp) => {
      if (!timestamp) return '';
      const ts = typeof timestamp === 'bigint' ? timestamp.toString() : timestamp;
      const date = new Date(Number(ts));
      return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    },
    formatDateInput: (timestamp) => {
      if (!timestamp) return '';
      const ts = typeof timestamp === 'bigint' ? timestamp.toString() : timestamp;
      const date = new Date(Number(ts));
      return date.toISOString().split('T')[0];
    },
    priorityClass: (priority) => {
      switch (priority) {
        case 'FAIBLE': return 'bg-blue-100 text-blue-800';
        case 'MOYENNE': return 'bg-yellow-100 text-yellow-800';
        case 'ELEVEE': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    },
    statusClass: (status) => {
      switch (status) {
        case 'A_FAIRE': return 'bg-gray-100 text-gray-800';
        case 'EN_COURS': return 'bg-blue-100 text-blue-800';
        case 'EN_REVISION': return 'bg-purple-100 text-purple-800';
        case 'TERMINEE': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    },
    equals: (a, b) => a === b,
    eq: (a, b) => a === b,
  },
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); // Utilise un chemin absolu pour les vues

// Middleware global pour passer le flash message aux vues
app.use((req, res, next) => {
  res.locals.successMessage = req.session.successMessage;
  delete req.session.successMessage;  // Supprime le message après l'avoir transmis
  next();
});

// Configuration des routes
console.log("Configuration des routes");
app.use('/auth', authRoutes);
app.use('/', indexRoutes);
app.use('/tasks', tasksRoutes);
app.use('/profile', profileRoutes);
app.get('*', (req, res) => res.redirect('/'));

// Middleware de gestion d'erreurs
app.use(errorHandler);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
