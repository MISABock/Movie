import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const text = await res.text();
    if (res.ok) {
      setMsg('Registrierung erfolgreich. Du kannst dich nun anmelden.');
      setTimeout(() => navigate('/login'), 1000);
    } else {
      setMsg(`Fehler: ${text}`);
    }
  };

  return (
    <div>
      <h2>Registrieren</h2>
      <form onSubmit={handleRegister}>
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Passwort" type="password" required />
        <button type="submit">Registrieren</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
