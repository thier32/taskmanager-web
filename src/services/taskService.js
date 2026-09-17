import api from '../api/AxiosInstance';

export const taskService = {
  /**
   * Récupère la liste des tâches depuis le backend.
   */
  getAllTasks: async () => {
    const response = await api.get('/api/tasks');
    // Extraction sécurisée des données selon votre structure de réponse
    return response.data?.result?.rows || response.data || [];
  },


  getAllTaskStatus: async () => {
    const response = await api.get('/api/tasks/status');
    // Extraction sécurisée des données selon votre structure de réponse
    return response.data?.result?.rows || response.data?.result || [];
  },

  /**
   * Exemple d'extension : Créer une tâche
   */
  createTask: async (taskData) => {
    const response = await api.post('/api/tasks', taskData);
    return response.data.result;
  },


  /**
   * Exemple d'extension : Créer une tâche
   */  
  updateTask: async (taskId, taskData) => {
    const response = await api.put(`/api/tasks/${taskId}`,  taskData);
    return response.data.result;
  },

  /**
   * Exemple d'extension : Supprimer une tâche
   */
  deleteTask: async (taskId) => {
    const response = await api.delete(`/api/tasks/${taskId}`);
    return response.data.result;
  }
};