import React from 'react';
import { formatDateTime } from '../utils/DateUtils'; // Ajustez le chemin selon votre structure

// Icônes SVG légères
const PlusIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const EditIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  isDeleting = false,
}) {
  const getStatusStyle = (status) => {
    const s = (status || 'PENDING').toUpperCase();
    switch (s) {
      case 'DONE':
      case 'COMPLETED':
        return {
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          color: '#4ade80',
          border: '1px solid rgba(34, 197, 94, 0.2)',
        };
      case 'IN_PROGRESS':
        return {
          backgroundColor: 'rgba(234, 179, 8, 0.1)',
          color: '#fde047',
          border: '1px solid rgba(234, 179, 8, 0.2)',
        };
      default:
        return {
          backgroundColor: 'rgba(148, 163, 184, 0.1)',
          color: '#cbd5e1',
          border: '1px solid rgba(148, 163, 184, 0.2)',
        };
    }
  };



  return (
    <div style={styles.card}>
      {/* En-tête : Numéro + Icônes de dates et heures à gauche, Statut à droite */}
      <div style={styles.cardHeader}>
        <div style={styles.headerLeft}>
          <span style={styles.taskId}>#{task.taskId}</span>
          <div style={styles.datesContainer}>
            {task.createdAt && (
              <span style={styles.dateItem} title={`Créée le : ${formatDateTime(task.createdAt)}`}>
                <PlusIcon /> {formatDateTime(task.createdAt)}
              </span>
            )}
            {task.createdAt && task.updatedAt && (
              <span style={styles.dateSeparator}>•</span>
            )}
            {task.updatedAt && (
              <span style={styles.dateItem} title={`Mise à jour : ${formatDateTime(task.updatedAt)}`}>
                <EditIcon /> {formatDateTime(task.updatedAt)}
              </span>
            )}
          </div>
        </div>

        <span style={{ ...styles.badge, ...getStatusStyle(task.status) }}>
          {task.status || 'PENDING'}
        </span>
      </div>

      {/* Titre & Description */}
      <h3 style={styles.cardTitle}>{task.title}</h3>
      <p style={styles.cardDescription}>
        {task.description || 'No description provided.'}
      </p>

      {/* Actions (Éditer / Supprimer) */}
      <div style={styles.cardFooter}>
        <button onClick={() => onEdit(task)} style={styles.editButton}>
          Edit
        </button>
        <button
          onClick={() => onDelete(task.taskId)}
          disabled={isDeleting}
          style={{
            ...styles.deleteButton,
            opacity: isDeleting ? 0.5 : 1,
          }}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    aspectRatio: '1 / 1',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
    boxSizing: 'border-box',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '8px',
    marginBottom: '8px',
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0px',
  },
  taskId: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#818cf8',
    lineHeight: '1.2',
  },
  datesContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    flexWrap: 'wrap',
    marginTop: '2px',
  },
  dateItem: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '3px',
    fontSize: '9px',
    color: '#64748b',
    lineHeight: '1',
  },
  dateSeparator: {
    fontSize: '8px',
    color: '#475569',
  },
  cardTitle: {
    margin: '0 0 4px 0',
    fontSize: '15px',
    fontWeight: '600',
    color: '#f8fafc',
    wordBreak: 'break-word',
  },
  cardDescription: {
    margin: '0 0 8px 0',
    fontSize: '13px',
    color: '#94a3b8',
    lineHeight: '1.4',
    overflowY: 'auto',
    flex: 1,
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
    paddingTop: '8px',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
  },
  editButton: {
    padding: '6px 12px',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    color: '#818cf8',
    border: '1px solid rgba(99, 102, 241, 0.2)',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '6px 12px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: '#f87171',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  badge: {
    fontSize: '10px',
    fontWeight: '700',
    padding: '3px 8px',
    borderRadius: '20px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    whiteSpace: 'nowrap',
  },
};