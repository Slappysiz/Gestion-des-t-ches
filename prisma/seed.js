import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Données initiales pour les tâches
const taskData = [
    {
        title: 'Créer le design de l\'application',
        description: 'Concevoir l\'interface utilisateur de l\'application en utilisant Figma',
        priority: 'ELEVEE',
        status: 'TERMINEE',
        dueDate: BigInt(new Date('2025-02-28').getTime()),
        userId: 1,
    },
    {
        title: 'Configurer la base de données',
        description: 'Mettre en place le schéma de la base de données et les migrations',
        priority: 'ELEVEE',
        status: 'TERMINEE',
        dueDate: BigInt(new Date('2025-03-05').getTime()),
        userId: 1,
    },
    {
        title: 'Implémenter l\'authentification',
        description: 'Ajouter le système de connexion et d\'inscription des utilisateurs',
        priority: 'MOYENNE',
        status: 'EN_COURS',
        dueDate: BigInt(new Date('2025-03-15').getTime()),
        userId: 1,
    },
    {
        title: 'Ajouter les fonctionnalités drag & drop',
        description: 'Permettre de déplacer les tâches entre les colonnes',
        priority: 'MOYENNE',
        status: 'A_FAIRE',
        dueDate: BigInt(new Date('2025-03-20').getTime()),
        userId: 1,
    },
    {
        title: 'Tester l\'application',
        description: 'Réaliser des tests unitaires et d\'intégration',
        priority: 'FAIBLE',
        status: 'A_FAIRE',
        dueDate: BigInt(new Date('2025-03-25').getTime()),
        userId: 1,
    },
    {
        title: 'Déployer l\'application',
        description: 'Mettre en production la version MVP de l\'application',
        priority: 'ELEVEE',
        status: 'A_FAIRE',
        dueDate: BigInt(new Date('2025-04-01').getTime()),
        userId: 1,
    },
    {
        title: 'Rédiger la documentation',
        description: 'Préparer la documentation technique et utilisateur',
        priority: 'FAIBLE',
        status: 'EN_REVISION',
        dueDate: BigInt(new Date('2025-03-28').getTime()),
        userId: 1,
    }
];

async function main() {
    console.log(`Début du seeding de la base de données...`);

    // Réinitialiser les tables existantes
    await prisma.history.deleteMany();
    await prisma.task.deleteMany();

    // Créer les tâches et leur historique
    for (const task of taskData) {
        const createdTask = await prisma.task.create({
            data: task,
        });

        // Créer l'entrée d'historique pour la création
        await prisma.history.create({
            data: {
                taskId: createdTask.id,
                action: 'Création',
                details: `Tâche "${createdTask.title}" créée`,
                userId: 1,
            },
        });

        console.log(`Tâche créée: ${createdTask.title}`);
    }

    console.log(`Seeding terminé.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });