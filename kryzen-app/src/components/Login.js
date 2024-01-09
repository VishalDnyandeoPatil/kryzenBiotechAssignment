import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const token = await login(username, password);
      // Store the token (e.g., in local storage or cookies) and handle success as needed
      window.alert('Login successful');
      setTimeout(() => {
        navigate('/data-form');
      }, 1000);
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error (display error message, etc.)
      window.alert('Login failed');
      setTimeout(() => {
        navigate('/register');
      }, 1000);
      
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
