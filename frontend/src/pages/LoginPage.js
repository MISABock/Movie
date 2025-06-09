// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const returnedUsername = await res.text(); // <- Benutzername vom Server
      localStorage.setItem('username', returnedUsername); // <- Speichern
      setStatus('Erfolgreich eingeloggt!');
      navigate(`/dashboard/${returnedUsername}`); // <- Dynamische Weiterleitung
    } else {
      const error = await res.text();
      setStatus(`Fehler: ${error}`);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Benutzername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button type="submit">Einloggen</button>
      </form>
      <p>{status}</p>
    </div>
  );
}

export default LoginPage;
