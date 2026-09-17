import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

export default function AuthPage({ onLoginSuccess }) {
  const [isLoginView, setIsLoginView] = useState(true);

  // Après inscription réussie : basculer sur la connexion (ou connecter directement)
  const handleRegisterSuccess = () => {
    setIsLoginView(true);
  };

  return isLoginView ? (
    <Login
      onLoginSuccess={onLoginSuccess}
      onSwitchToRegister={() => setIsLoginView(false)}
    />
  ) : (
    <Register
      onRegisterSuccess={handleRegisterSuccess}
      onSwitchToLogin={() => setIsLoginView(true)}
    />
  );
}