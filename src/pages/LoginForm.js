import React, { useState } from 'react';

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to handle GET request
  const handleFetchLoginDetails = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login-details', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        setEmail(data.email || '');
        setPassword(data.password || '');
      } else {
        const result = await response.json();
        setError(result.message || 'Unable to fetch login details');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('An error occurred while fetching login details.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.token && data.userId) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);
          onLoginSuccess(data.userId, data.token);
        } else {
          setError('Invalid response from server');
        }
      } else {
        const result = await response.json();
        setError(result.message || 'Invalid login credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleFetchLoginDetails} disabled={loading}>
        {loading ? 'Fetching details...' : 'Get Login Details'}
      </button>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginForm;
