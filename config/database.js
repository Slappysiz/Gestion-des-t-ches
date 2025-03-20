import { PrismaClient } from '@prisma/client';

// Initialisation du client Prisma avec des logs en mode développement
const prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

export default prisma;