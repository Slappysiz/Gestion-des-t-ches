import TaskModel from '../models/taskmodel.js';

const HomeController = {
  renderHomePage: async (req, res, next) => {
    try {
      // Récupère toutes les tâches
      const tasks = await TaskModel.getAllTasks({}, {});

      // Regroupe les tâches par statut
      const tasksByStatus = {
        A_FAIRE: tasks.filter(task => task.status === 'A_FAIRE'),
        EN_COURS: tasks.filter(task => task.status === 'EN_COURS'),
        EN_REVISION: tasks.filter(task => task.status === 'EN_REVISION'),
        TERMINEE: tasks.filter(task => task.status === 'TERMINEE'),
      };

      // Rend la page d'accueil
      res.render('home', {
        title: 'Accueil',
        tasksByStatus,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default HomeController;
