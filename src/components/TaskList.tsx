import React, { useEffect, useState } from 'react';
import { taskService } from '../services/taskService';
import EditTaskModal from './EditTaskModal';
import NewTaskModal from './NewTaskModal';
import TaskCard from './TaskCard';

export default function TaskList({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [taskStatus, setTaskStatus] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Recherche & Filtre
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 6;

  // Modale de Création
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [creating, setCreating] = useState(false);

  // Modale d'Édition
  const [editingTask, setEditingTask] = useState(null); // Tâche en cours d'édition
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editStatus, setEditStatus] = useState('PENDING');
  const [updating, setUpdating] = useState(false);

  // État pour la suppression
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchTasks();
    fetchTaskStatus();
  }, []);

  const fetchTaskStatus = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await taskService.getAllTaskStatus();
      setTaskStatus(data);
    } catch (err) {
      setError('Failed to fetch tasks.');
    } finally {
      setLoading(false);
    }
  };


  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to fetch tasks.');
    } finally {
      setLoading(false);
    }
  };

  // --- CRÉATION ---
  const handleCreateTask = async (e,taskData) => {
    e.preventDefault();
    try {
      setCreating(true);
      const newTask = await taskService.createTask(taskData);
      setTasks((prev) => [newTask, ...prev]);
      setNewTitle('');
      setNewDescription('');
      setIsCreateModalOpen(false);
    } catch (err) {
      alert('Failed to create task.');
    } finally {
      setCreating(false);
    }
  };

  // --- ÉDITION ---
  const openEditModal = (task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = async (e,updatedData) => {
    e.preventDefault();
    if (!editingTask) return;

    try {
      setUpdating(true);
      console.log(updatedData);      
      const updatedTask = await taskService.updateTask(editingTask.taskId, updatedData);
      setTasks((prev) =>
        prev.map((t) => (t.taskId === editingTask.taskId ? updatedTask : t))
      );
      setEditingTask(null);
    } catch (err) {
      console.log(err);
      alert('Failed to update task.');
    } finally {
      setUpdating(false);
    }
  };

  // --- SUPPRESSION ---
  const handleDeleteTask = async (id) => {
    if (!window.confirm('Etes-vous sûr de vouloir supprimer cette tâche ?')) return;

    try {
      setDeletingId(id);
      const result = await taskService.deleteTask(id);
      if (result == 1){
        setTasks((prev) => prev.filter((t) => t.taskId !== id));
        // Ajuster la page courante si on supprime le dernier élément d'une page
        if (currentTasks.length === 1 && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
        }      
      }
    } catch (err) {
      alert('Failed to delete task.');
    } finally {
      setDeletingId(null);
    }
  };

  // Filtrage des tâches selon le terme recherché et le statut
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const taskStatus = (task.status || 'CREATED').toUpperCase();
    const matchesStatus = statusFilter === 'ALL' || taskStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculs de pagination
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const getStatusStyle = (status) => {
    const s = (status || 'PENDING').toUpperCase();
    switch (s) {
      case 'DONE':
      case 'COMPLETED':
        return { backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.2)' };
      case 'IN_PROGRESS':
        return { backgroundColor: 'rgba(234, 179, 8, 0.1)', color: '#fde047', border: '1px solid rgba(234, 179, 8, 0.2)' };
      default:
        return { backgroundColor: 'rgba(148, 163, 184, 0.1)', color: '#cbd5e1', border: '1px solid rgba(148, 163, 184, 0.2)' };
    }
  };

  if (loading) {
    return (
      <div style={styles.centerContainer}>
        <p style={{ color: '#94a3b8' }}>Loading tasks...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Barre supérieure */}
      <div style={styles.topBar}>
        <h3 style={styles.subTitle}>My Tasks</h3>
        <div style={styles.actionsGroup}>
          <button onClick={() => setIsCreateModalOpen(true)} style={styles.createButton}>
            + New Task
          </button>
          {onLogout && (
            <button onClick={onLogout} style={styles.logoutButton}>
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Barre de Recherche et Filtres */}
      <div style={styles.filterBar}>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={styles.filterSelect}
        >
          <option value="ALL">All Statuses</option>
          {taskStatus.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
        </select>
      </div>      

      {error && (
        <div style={styles.errorBox}>
          <span>{error}</span>
        </div>
      )}

      {filteredTasks.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No tasks found.</p>
        </div>
      ) : (
        <>
          <div style={styles.grid}>
            {currentTasks.map((task) => (
              <TaskCard task={task} onDelete={handleDeleteTask} onEdit={openEditModal} 
              isDeleting={deletingId === task.taskId} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={styles.paginationContainer}>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                style={{
                  ...styles.paginationButton,
                  opacity: currentPage === 1 ? 0.5 : 1,
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                }}
              >
                Précédent
              </button>

              <span style={styles.pageInfo}>
                Page {currentPage} sur {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                style={{
                  ...styles.paginationButton,
                  opacity: currentPage === totalPages ? 0.5 : 1,
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                }}
              >
                Suivant
              </button>
            </div>
          )}
        </>
      )}

      {/* MODALE DE CRÉATION */}
      {isCreateModalOpen && (
        <NewTaskModal isOpen={isCreateModalOpen} taskStatus={taskStatus}
        creating={creating} onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateTask}
        />
      )}

      {/* MODALE D'ÉDITION */}
      <EditTaskModal
        isOpen={Boolean(editingTask)}
                editingTask={editingTask}
        taskStatus={taskStatus}
        updating={updating}
        onClose={() => setEditingTask(null)}
        onSubmit={handleUpdateTask}
      />  

    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    color: '#f8fafc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  centerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px'
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  actionsGroup: {
    display: 'flex',
    gap: '12px'
  },
  subTitle: {
    margin: 0,
    fontSize: '18px',
    fontWeight: '600',
    color: '#f8fafc'
  },
  createButton: {
    padding: '8px 16px',
    backgroundColor: '#6366f1',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600'
  },
  logoutButton: {
    padding: '8px 16px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: '#f87171',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600'
  },
  errorBox: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    color: '#f87171',
    borderRadius: '8px',
    padding: '12px 16px',
    marginBottom: '20px',
    fontSize: '14px'
  },
  emptyState: {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '32px',
    textAlign: 'center',
    color: '#94a3b8'
  },
  /* Modifié : passage à une grille responsive de cartes carrées */
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '10px',
  },
  /* Modifié : style carré avec format d'aspect fixe et flexbox vertical */
  card: {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '6px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    aspectRatio: '1 / 1',
    boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.2)',
    boxSizing: 'border-box',
  },
  /* Vue rectangle
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  card: {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)'
  },*/
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '16px'
  },
  cardTitle: {
    margin: 0,
    fontSize: '16px',
    fontWeight: '600',
    color: '#f8fafc'
  },
  cardDescription: {
    margin: 0,
    fontSize: '14px',
    color: '#94a3b8',
    lineHeight: '1.5'
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
    paddingTop: '8px',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)'
  },
  editButton: {
    padding: '6px 12px',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    color: '#818cf8',
    border: '1px solid rgba(99, 102, 241, 0.2)',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  deleteButton: {
    padding: '6px 12px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: '#f87171',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  badge: {
    fontSize: '11px',
    fontWeight: '700',
    padding: '4px 10px',
    borderRadius: '20px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    whiteSpace: 'nowrap'
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
    marginTop: '24px'
  },
  paginationButton: {
    padding: '8px 16px',
    backgroundColor: '#1e293b',
    color: '#f8fafc',
    border: '1px solid #334155',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500'
  },
  pageInfo: {
    fontSize: '14px',
    color: '#94a3b8'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modalCard: {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '24px',
    width: '100%',
    maxWidth: '450px'
  },
  modalTitle: {
    margin: '0 0 16px 0',
    fontSize: '18px',
    color: '#f8fafc'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    backgroundColor: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '6px',
    color: '#f8fafc',
    outline: 'none',
    boxSizing: 'border-box'
  },
  textarea: {
    width: '100%',
    padding: '10px 14px',
    backgroundColor: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '6px',
    color: '#f8fafc',
    outline: 'none',
    resize: 'vertical',
    boxSizing: 'border-box'
  },
  select: {
    width: '100%',
    padding: '10px 14px',
    backgroundColor: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '6px',
    color: '#f8fafc',
    outline: 'none',
    boxSizing: 'border-box'
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '8px'
  },
  cancelButton: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    color: '#94a3b8',
    border: '1px solid #334155',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  submitButton: {
    padding: '8px 16px',
    backgroundColor: '#6366f1',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  filterBar: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px'
  },
  searchInput: {
    flex: 1,
    padding: '10px 14px',
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '8px',
    color: '#f8fafc',
    fontSize: '14px',
    outline: 'none'
  },
  filterSelect: {
    padding: '10px 14px',
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '8px',
    color: '#f8fafc',
    fontSize: '14px',
    outline: 'none',
    cursor: 'pointer'
  },
};