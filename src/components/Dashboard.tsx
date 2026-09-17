import React, { useState } from 'react';
import TaskList from './TaskList'; // Votre composant de liste de tâches

export default function Dashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('tasks');
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div style={styles.container}>
      {/* Menu Latéral */}
      <aside
        style={{
          ...styles.sidebar,
          width: isCollapsed ? '80px' : '260px',
        }}
      >
        <div style={styles.logoContainer}>
          {!isCollapsed && <h1 style={styles.logo}>TaskManager</h1>}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={styles.toggleButton}
            title={isCollapsed ? 'Déplier' : 'Replier'}
          >
            <svg style={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isCollapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7M19 19l-7-7 7-7"} />
            </svg>
          </button>
        </div>

        <nav style={styles.nav}>
          <button
            style={{
              ...styles.navItem,
              ...(activeTab === 'dashboard' ? styles.navItemActive : {}),
              justifyContent: isCollapsed ? 'center' : 'flex-start',
            }}
            onClick={() => setActiveTab('dashboard')}
            title="Dashboard"
          >
            <svg style={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {!isCollapsed && <span>Dashboard</span>}
          </button>

          <button
            style={{
              ...styles.navItem,
              ...(activeTab === 'tasks' ? styles.navItemActive : {}),
              justifyContent: isCollapsed ? 'center' : 'flex-start',
            }}
            onClick={() => setActiveTab('tasks')}
            title="Tasks"
          >
            <svg style={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            {!isCollapsed && <span>Tasks</span>}
          </button>
        </nav>

        <div style={styles.footer}>
          <button
            onClick={onLogout}
            style={{
              ...styles.logoutButton,
              justifyContent: isCollapsed ? 'center' : 'flex-start',
            }}
            title="Déconnexion"
          >
            <svg style={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {!isCollapsed && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Contenu Principal */}
      <main style={styles.mainContent}>
        <header style={styles.header}>
          <h2 style={styles.headerTitle}>
            {activeTab === 'dashboard' ? 'Vue d\'ensemble' : 'Gestion des Tâches'}
          </h2>
        </header>

        <section style={styles.contentBody}>
          {activeTab === 'dashboard' && (
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <span style={styles.statLabel}>Total Tâches</span>
                <span style={styles.statValue}>12</span>
              </div>
              <div style={styles.statCard}>
                <span style={styles.statLabel}>En cours</span>
                <span style={styles.statValue}>4</span>
              </div>
              <div style={styles.statCard}>
                <span style={styles.statLabel}>Terminées</span>
                <span style={styles.statValue}>8</span>
              </div>
            </div>
          )}

          {activeTab === 'tasks' && <TaskList />}
        </section>
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#0f172a',
    color: '#f8fafc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  sidebar: {
    backgroundColor: '#1e293b',
    borderRight: '1px solid #334155',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 16px',
    transition: 'width 0.3s ease',
    boxSizing: 'border-box'
  },
  logoContainer: {
    paddingBottom: '24px',
    borderBottom: '1px solid #334155',
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logo: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '700',
    color: '#6366f1',
    whiteSpace: 'nowrap'
  },
  toggleButton: {
    background: 'transparent',
    border: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    margin: '0 auto'
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: 'transparent',
    color: '#94a3b8',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap'
  },
  navItemActive: {
    backgroundColor: '#6366f1',
    color: '#ffffff'
  },
  icon: {
    width: '20px',
    height: '20px',
    flexShrink: 0
  },
  footer: {
    borderTop: '1px solid #334155',
    paddingTop: '16px'
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: '#f87171',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    whiteSpace: 'nowrap'
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto'
  },
  header: {
    padding: '24px 32px',
    borderBottom: '1px solid #334155',
    backgroundColor: '#1e293b'
  },
  headerTitle: {
    margin: 0,
    fontSize: '22px',
    fontWeight: '700'
  },
  contentBody: {
    padding: '32px',
    flex: 1
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px'
  },
  statCard: {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  statLabel: {
    fontSize: '14px',
    color: '#94a3b8'
  },
  statValue: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#f8fafc'
  }
};