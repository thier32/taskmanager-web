import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import AuthPage from './components/Auth';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem('token')
  );

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <div>
      {isAuthenticated ? (
        <AuthProvider>
          <Dashboard onLogout={handleLogout} />
        </AuthProvider>
      ) : (
        <AuthPage onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}