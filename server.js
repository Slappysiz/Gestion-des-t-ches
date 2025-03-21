import express from 'express';
import { engine } from 'express-handlebars';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes
import indexRoutes from './routes/index.js';
import tasksRoutes from './routes/tasks.js';

// Middleware
import errorHandler from './middleware/errorHandler.js';

// Configuration
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Conversion dirname pour ES modules
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

// Définition du moteur Handlebars
app.engine('handlebars', engine({
  helpers: {
    formatDate: (timestamp) => {
      if (!timestamp) return '';
      const timestampValue = typeof timestamp === 'bigint' ? timestamp.toString() : timestamp;
      const date = new Date(Number(timestampValue));
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    },
    formatDateInput: (timestamp) => {
      if (!timestamp) return '';
      const timestampValue = typeof timestamp === 'bigint' ? timestamp.toString() : timestamp;
      const date = new Date(Number(timestampValue));
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
    eq: (a, b) => a === b
  }
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

// Configuration des routes
console.log("Configuration des routes");
app.use('/', indexRoutes);
app.use('/tasks', tasksRoutes);

app.get('*', (req, res) => {
  res.redirect('/');
});

// Middleware de gestion d'erreurs
app.use(errorHandler);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
