import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

function AuthWrapper({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // Aquí podrías hacer una llamada para verificar el token
      // Por ahora asumimos que si hay token, está autenticado
    }
    setLoading(false);
  };

  const handleLogin = async (credentials) => {
    try {
      const data = await apiService.login(credentials);
      localStorage.setItem('token', data.access_token);
      setIsAuthenticated(true);
      setUser(data.user || { email: credentials.email });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h3>🔐 Autenticación Requerida</h3>
        <p>Necesitas iniciar sesión para acceder a los datos de estudiantes.</p>
        <LoginForm onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <div style={{ 
        backgroundColor: '#d4edda', 
        padding: '10px', 
        marginBottom: '20px',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>✅ Autenticado como: {user?.email || 'Usuario'}</span>
        <button 
          onClick={handleLogout}
          style={{
            padding: '5px 10px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Cerrar Sesión
        </button>
      </div>
      {children}
    </div>
  );
}

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await onLogin({ email, password });
    
    if (!result.success) {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '300px', margin: '0 auto' }}>
      <div style={{ marginBottom: '15px' }}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            boxSizing: 'border-box'
          }}
        />
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            boxSizing: 'border-box'
          }}
        />
      </div>
      
      {error && (
        <div style={{ 
          color: '#dc3545', 
          marginBottom: '15px',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}
      
      <button
        type="submit"
        disabled={loading}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: loading ? '#6c757d' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </button>
    </form>
  );
}

export default AuthWrapper;
