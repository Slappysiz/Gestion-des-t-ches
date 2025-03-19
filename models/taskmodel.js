import prisma from '../config/database.js';

// Modèle pour les opérations CRUD des tâches
const TaskModel = {
    // Récupérer toutes les tâches avec possibilité de filtrage et tri
    getAllTasks: async (filter = {}, sort = {}) => {
        try {
            const where = {};

            // Filtrage par priorité
            if (filter.priority) {
                where.priority = filter.priority;
            }

            // Filtrage par statut
            if (filter.status) {
                where.status = filter.status;
            }

            // Tri par date
            const orderBy = [];
            if (sort.field === 'dueDate') {
                orderBy.push({ dueDate: sort.direction || 'asc' });
            } else if (sort.field === 'createdAt') {
                orderBy.push({ createdAt: sort.direction || 'desc' });
            } else {
                // Par défaut, trié par date de création (plus récent en premier)
                orderBy.push({ createdAt: 'desc' });
            }

            const tasks = await prisma.task.findMany({
                where,
                orderBy,
            });

            return tasks;
        } catch (error) {
            console.error('Erreur lors de la récupération des tâches:', error);
            throw error;
        }
    },

    // Récupérer une tâche par son ID
    getTaskById: async (id) => {
        try {
            // Vérifier si l'id est un nombre valide
            const taskId = parseInt(id);
            if (isNaN(taskId)) {
                throw new Error(`ID de tâche invalide: ${id}`);
            }

            const task = await prisma.task.findUnique({
                where: { id: taskId },
                include: {
                    history: {
                        orderBy: { timestamp: 'desc' },
                    },
                },
            });

            return task;
        } catch (error) {
            console.error(`Erreur lors de la récupération de la tâche avec l'ID ${id}:`, error);
            throw error;
        }
    },

    // Créer une nouvelle tâche
    createTask: async (taskData) => {
        try {
            // Création de la transaction pour créer la tâche et son historique
            return await prisma.$transaction(async (prisma) => {
                const task = await prisma.task.create({
                    data: taskData,
                });

                // Ajouter une entrée dans l'historique
                await prisma.history.create({
                    data: {
                        taskId: task.id,
                        action: 'Création',
                        details: `Tâche "${task.title}" créée`,
                        userId: 1, // Utilisateur unique par défaut
                    },
                });

                return task;
            });
        } catch (error) {
            console.error('Erreur lors de la création de la tâche:', error);
            throw error;
        }
    },

    // Mettre à jour une tâche
    updateTask: async (id, taskData) => {
        try {
            // Vérifier si l'id est un nombre valide
            const taskId = parseInt(id);
            if (isNaN(taskId)) {
                throw new Error(`ID de tâche invalide: ${id}`);
            }

            // Récupération de la tâche actuelle pour comparaison
            const currentTask = await prisma.task.findUnique({
                where: { id: taskId },
            });

            if (!currentTask) {
                throw new Error(`Tâche avec l'ID ${id} non trouvée`);
            }

            // Création de la transaction pour mettre à jour la tâche et son historique
            return await prisma.$transaction(async (prisma) => {
                // Mettre à jour la tâche
                const updatedTask = await prisma.task.update({
                    where: { id: taskId },
                    data: taskData,
                });

                // Générer les détails pour l'historique
                const changes = [];
                if (currentTask.title !== taskData.title) {
                    changes.push(`Titre: "${currentTask.title}" -> "${taskData.title}"`);
                }
                if (currentTask.description !== taskData.description) {
                    changes.push(`Description mise à jour`);
                }
                if (currentTask.priority !== taskData.priority) {
                    changes.push(`Priorité: "${currentTask.priority}" -> "${taskData.priority}"`);
                }
                if (currentTask.status !== taskData.status) {
                    changes.push(`Statut: "${currentTask.status}" -> "${taskData.status}"`);
                }
                if (currentTask.dueDate !== taskData.dueDate) {
                    changes.push(`Date limite mise à jour`);
                }

                // Ajouter une entrée dans l'historique
                if (changes.length > 0) {
                    await prisma.history.create({
                        data: {
                            taskId: updatedTask.id,
                            action: 'Modification',
                            details: changes.join(', '),
                            userId: 1, // Utilisateur unique par défaut
                        },
                    });
                }

                return updatedTask;
            });
        } catch (error) {
            console.error(`Erreur lors de la mise à jour de la tâche avec l'ID ${id}:`, error);
            throw error;
        }
    },

    // Supprimer une tâche
    deleteTask: async (id) => {
        try {
            // Vérifier si l'id est un nombre valide
            const taskId = parseInt(id);
            if (isNaN(taskId)) {
                throw new Error(`ID de tâche invalide: ${id}`);
            }

            const task = await prisma.task.delete({
                where: { id: taskId },
            });

            return task;
        } catch (error) {
            console.error(`Erreur lors de la suppression de la tâche avec l'ID ${id}:`, error);
            throw error;
        }
    },

    // Mettre à jour le statut d'une tâche
    updateTaskStatus: async (id, status) => {
        try {
            // Vérifier si l'id est un nombre valide
            const taskId = parseInt(id);
            if (isNaN(taskId)) {
                throw new Error(`ID de tâche invalide: ${id}`);
            }

            // Récupération de la tâche actuelle pour comparaison
            const currentTask = await prisma.task.findUnique({
                where: { id: taskId },
            });

            if (!currentTask) {
                throw new Error(`Tâche avec l'ID ${id} non trouvée`);
            }

            // Création de la transaction pour mettre à jour le statut et son historique
            return await prisma.$transaction(async (prisma) => {
                // Mettre à jour le statut
                const updatedTask = await prisma.task.update({
                    where: { id: taskId },
                    data: { status },
                });

                // Ajouter une entrée dans l'historique
                if (currentTask.status !== status) {
                    await prisma.history.create({
                        data: {
                            taskId: updatedTask.id,
                            action: 'Changement de statut',
                            details: `Statut: "${currentTask.status}" -> "${status}"`,
                            userId: 1, // Utilisateur unique par défaut
                        },
                    });
                }

                return updatedTask;
            });
        } catch (error) {
            console.error(`Erreur lors de la mise à jour du statut de la tâche avec l'ID ${id}:`, error);
            throw error;
        }
    },
};

export default TaskModel;