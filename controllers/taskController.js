import TaskModel from '../models/taskmodel.js';

const TaskController = {
    // Afficher la liste des tâches
    renderTasksList: async (req, res, next) => {
        try {
            // Récupérer les paramètres de filtrage et de tri
            const filter = {
                priority: req.query.priority,
                status: req.query.status,
            };

            const sort = {
                field: req.query.sortBy,
                direction: req.query.sortDirection,
            };

            // Récupérer toutes les tâches
            const tasks = await TaskModel.getAllTasks(filter, sort);

            // Organiser les tâches par statut
            const tasksByStatus = {
                A_FAIRE: tasks.filter(task => task.status === 'A_FAIRE'),
                EN_COURS: tasks.filter(task => task.status === 'EN_COURS'),
                EN_REVISION: tasks.filter(task => task.status === 'EN_REVISION'),
                TERMINEE: tasks.filter(task => task.status === 'TERMINEE'),
            };

            // Rendre la vue
            res.render('tasks/index', {
                title: 'Gestionnaire de Tâches',
                tasksByStatus,
                filter,
                sort,
                priorities: ['FAIBLE', 'MOYENNE', 'ELEVEE'],
            });
        } catch (error) {
            next(error);
        }
    },

    // Afficher le formulaire de création de tâche
    renderCreateTaskForm: (req, res) => {
        res.render('tasks/edit', {
            title: 'Créer une nouvelle tâche',
            task: {},
            action: '/tasks/create',
            priorities: ['FAIBLE', 'MOYENNE', 'ELEVEE'],
            statuses: ['A_FAIRE', 'EN_COURS', 'EN_REVISION', 'TERMINEE'],
        });
    },

    // Créer une nouvelle tâche
    createTask: async (req, res, next) => {
        try {
            const { title, description, priority, status, dueDate } = req.body;

            // Validation des données
            if (!title) {
                return res.status(400).render('tasks/edit', {
                    title: 'Créer une nouvelle tâche',
                    task: req.body,
                    error: 'Le titre est obligatoire',
                    action: '/tasks/create',
                    priorities: ['FAIBLE', 'MOYENNE', 'ELEVEE'],
                    statuses: ['A_FAIRE', 'EN_COURS', 'EN_REVISION', 'TERMINEE'],
                });
            }

            // Préparation des données
            const taskData = {
                title,
                description,
                priority: priority || 'MOYENNE',
                status: status || 'A_FAIRE',
                dueDate: dueDate ? BigInt(dueDate) : null,
                userId: 1, // Utilisateur unique par défaut
            };

            // Créer la tâche
            await TaskModel.createTask(taskData);

            // Rediriger vers la liste des tâches
            res.redirect('/tasks');
        } catch (error) {
            next(error);
        }
    },

    // Afficher les détails d'une tâche
    renderTaskDetails: async (req, res, next) => {
        try {
            const { id } = req.params;
            console.log(`Tentative d'affichage des détails pour la tâche ID: ${id}`);

            // Vérifier si l'id est valide
            const taskId = parseInt(id);
            if (isNaN(taskId)) {
                console.error(`ID de tâche invalide: ${id}`);
                return res.status(400).render('error', {
                    title: 'Erreur',
                    message: `ID de tâche invalide: ${id}`,
                });
            }

            // Récupérer la tâche
            const task = await TaskModel.getTaskById(taskId);
            console.log('Tâche récupérée:', task ? `Trouvée (${task.title})` : 'Non trouvée');

            if (!task) {
                return res.status(404).render('error', {
                    title: 'Erreur',
                    message: `Tâche avec l'ID ${id} non trouvée`,
                });
            }

            // Rendre la vue
            console.log('Rendu de la vue details avec la tâche ID:', task.id);
            res.render('tasks/detail', {
                title: `Détails de la tâche: ${task.title}`,
                task,
            });
        } catch (error) {
            console.error(`Erreur lors de l'affichage des détails de la tâche:`, error);
            next(error);
        }
    },

    // Afficher le formulaire de modification
    renderEditTaskForm: async (req, res, next) => {
        try {
            const { id } = req.params;

            // Vérifier si l'id est valide
            const taskId = parseInt(id);
            if (isNaN(taskId)) {
                return res.status(400).render('error', {
                    title: 'Erreur',
                    message: `ID de tâche invalide: ${id}`,
                });
            }

            // Récupérer la tâche
            const task = await TaskModel.getTaskById(taskId);

            if (!task) {
                return res.status(404).render('error', {
                    title: 'Erreur',
                    message: `Tâche avec l'ID ${id} non trouvée`,
                });
            }

            // Rendre la vue
            res.render('tasks/edit', {
                title: `Modifier la tâche: ${task.title}`,
                task,
                action: `/tasks/${id}/update`,
                priorities: ['FAIBLE', 'MOYENNE', 'ELEVEE'],
                statuses: ['A_FAIRE', 'EN_COURS', 'EN_REVISION', 'TERMINEE'],
            });
        } catch (error) {
            next(error);
        }
    },

    // Mettre à jour une tâche
    updateTask: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { title, description, priority, status, dueDate } = req.body;

            // Validation de l'id
            const taskId = parseInt(id);
            if (isNaN(taskId)) {
                return res.status(400).render('error', {
                    title: 'Erreur',
                    message: `ID de tâche invalide: ${id}`,
                });
            }

            // Validation des données
            if (!title) {
                return res.status(400).render('tasks/edit', {
                    title: 'Modifier la tâche',
                    task: { id, ...req.body },
                    error: 'Le titre est obligatoire',
                    action: `/tasks/${id}/update`,
                    priorities: ['FAIBLE', 'MOYENNE', 'ELEVEE'],
                    statuses: ['A_FAIRE', 'EN_COURS', 'EN_REVISION', 'TERMINEE'],
                });
            }

            // Préparation des données
            const taskData = {
                title,
                description,
                priority,
                status,
                dueDate: dueDate ? BigInt(dueDate) : null,
            };

            // Mettre à jour la tâche
            await TaskModel.updateTask(id, taskData);

            // Rediriger vers les détails de la tâche
            res.redirect(`/tasks/${id}`);
        } catch (error) {
            next(error);
        }
    },

    // Supprimer une tâche
    deleteTask: async (req, res, next) => {
        try {
            const { id } = req.params;

            // Validation de l'id
            const taskId = parseInt(id);
            if (isNaN(taskId)) {
                return res.status(400).render('error', {
                    title: 'Erreur',
                    message: `ID de tâche invalide: ${id}`,
                });
            }

            // Supprimer la tâche
            await TaskModel.deleteTask(id);

            // Rediriger vers la liste des tâches
            res.redirect('/tasks');
        } catch (error) {
            next(error);
        }
    },

    // Mettre à jour le statut d'une tâche (pour le drag & drop)
    updateTaskStatus: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { status } = req.body;

            // Validation de l'id
            const taskId = parseInt(id);
            if (isNaN(taskId)) {
                return res.status(400).json({ error: `ID de tâche invalide: ${id}` });
            }

            // Validation des données
            if (!status) {
                return res.status(400).json({ error: 'Le statut est obligatoire' });
            }

            // Mettre à jour le statut
            const updatedTask = await TaskModel.updateTaskStatus(id, status);

            // Convertir les BigInt en String pour éviter l'erreur de sérialisation JSON
            const sanitizedTask = {
                ...updatedTask,
                dueDate: updatedTask.dueDate ? updatedTask.dueDate.toString() : null,
                // On convertit également les autres dates au cas où
                createdAt: updatedTask.createdAt ? new Date(updatedTask.createdAt).toISOString() : null,
                updatedAt: updatedTask.updatedAt ? new Date(updatedTask.updatedAt).toISOString() : null
            };

            // Répondre avec la tâche mise à jour
            res.json(sanitizedTask);
        } catch (error) {
            console.error("Erreur lors de la mise à jour du statut:", error);
            res.status(500).json({ error: error.message || "Une erreur est survenue" });
        }
    },
};

export default TaskController;