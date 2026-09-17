import React, { useState } from 'react';
import api from '../api/AxiosInstance';

export default function Login({ onLoginSuccess,onSwitchToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { username, password });
      const token = response.data.result.bearer || response.data.result.token || response.data.jwt;

      if (token) {
        localStorage.setItem('token', token);
        onLoginSuccess();
      } else {
        setError('Token not received from server.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'Login failed. Please check your credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Welcome back</h2>
          <p style={styles.subtitle}>Enter your details to access your workspace</p>
        </div>

        {error && (
          <div style={styles.errorBox}>
            <span style={styles.errorText}>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputWrapper}>
            <svg style={styles.iconLeft} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <input
              id="username"
              type="text"
              required
              aria-label="Username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputWrapper}>
            <svg style={styles.iconLeft} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              required
              aria-label="Password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.inputPassword}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                // Eye Off Icon
                <svg style={styles.iconRight} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" />
                </svg>
              ) : (
                // Eye Icon
                <svg style={styles.iconRight} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
              {onSwitchToRegister && (
  <div style={styles.footer}>
    <span style={styles.footerText}>Don't have an account? </span>
    <button onClick={onSwitchToRegister} style={styles.linkButton}>
      Sign Up
    </button>
  </div>
)}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#0f172a',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '20px'
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    padding: '40px',
    backgroundColor: '#1e293b',
    borderRadius: '16px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
    border: '1px solid #334155'
  },
  header: {
    marginBottom: '32px',
    textAlign: 'center'
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '24px',
    fontWeight: '700',
    color: '#f8fafc',
    letterSpacing: '-0.025em'
  },
  subtitle: {
    margin: 0,
    fontSize: '14px',
    color: '#94a3b8'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  iconLeft: {
    position: 'absolute',
    left: '12px',
    width: '18px',
    height: '18px',
    color: '#64748b',
    pointerEvents: 'none'
  },
  input: {
    width: '100%',
    padding: '12px 16px 12px 40px',
    fontSize: '15px',
    color: '#f8fafc',
    backgroundColor: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '8px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  inputPassword: {
    width: '100%',
    padding: '12px 40px 12px 40px', // Space for both left lock icon and right eye button
    fontSize: '15px',
    color: '#f8fafc',
    backgroundColor: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '8px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  eyeButton: {
    position: 'absolute',
    right: '12px',
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconRight: {
    width: '18px',
    height: '18px',
    color: '#64748b'
  },
  button: {
    marginTop: '8px',
    width: '100%',
    padding: '12px 20px',
    fontSize: '15px',
    fontWeight: '600',
    color: '#ffffff',
    backgroundColor: '#6366f1',
    border: 'none',
    borderRadius: '8px' // Box-shadow glow removed
  },
  errorBox: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    borderRadius: '8px',
    padding: '12px 16px',
    marginBottom: '20px'
  },
  errorText: {
    color: '#f87171',
    fontSize: '14px',
    display: 'block',
    textAlign: 'center'
  },
  footer: {
  marginTop: '24px',
  textAlign: 'center'
},
footerText: {
  color: '#94a3b8',
  fontSize: '14px'
},
linkButton: {
  background: 'none',
  border: 'none',
  color: '#818cf8',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
  padding: 0
}
};