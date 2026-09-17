import React, { useEffect, useState } from 'react';

export default function EditTaskModal({
  isOpen,
  editingTask,
  taskStatus = [],
  updating=false,
  onClose,
  onSubmit,
}) 
{
  const [editTitle, setEditTitle] = useState(editingTask?.title);
  const [editDescription, setEditDescription] = useState('');
  const [editStatus, setEditStatus] = useState('PENDING');
  const [setEditingTask] = useState(editingTask); // Tâche en cours d'édition

  useEffect(() => {
    if (editingTask) {
      setEditTitle(editingTask.title || '');
      setEditDescription(editingTask.description || '');
      setEditStatus(editingTask.status || 'PENDING');
    }
  }, [editingTask]);

  if (!isOpen || !editingTask) return null;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    onSubmit(e, {
      title: editTitle,
      description: editDescription,
      status: editStatus,
    });
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalCard}>
        <h3 style={styles.modalTitle}>Edit Task</h3>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Task Title"
            required
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            style={styles.input}
          />
          <textarea
            placeholder="Task Description"
            rows={4}
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            style={styles.textarea}
          />
          <select
            value={editStatus}
            onChange={(e) => setEditStatus(e.target.value)}
            style={styles.select}
          >
            {taskStatus.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <div style={styles.modalActions}>
            <button
              type="button"
              onClick={onClose}
              style={styles.cancelButton}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updating}
              style={styles.submitButton}
            >
              {updating ? 'Updating...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  modalOverlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalCard: {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '24px',
    width: '100%',
    maxWidth: '450px',
  },
  modalTitle: {
    margin: '0 0 16px 0',
    fontSize: '18px',
    color: '#f8fafc',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    backgroundColor: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '6px',
    color: '#f8fafc',
    outline: 'none',
    boxSizing: 'border-box' as const,
  },
  textarea: {
    width: '100%',
    padding: '10px 14px',
    backgroundColor: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '6px',
    color: '#f8fafc',
    outline: 'none',
    resize: 'vertical' as const,
    boxSizing: 'border-box' as const,
  },
  select: {
    width: '100%',
    padding: '10px 14px',
    backgroundColor: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '6px',
    color: '#f8fafc',
    outline: 'none',
    boxSizing: 'border-box' as const,
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '8px',
  },
  cancelButton: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    color: '#94a3b8',
    border: '1px solid #334155',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  submitButton: {
    padding: '8px 16px',
    backgroundColor: '#6366f1',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
  },
};