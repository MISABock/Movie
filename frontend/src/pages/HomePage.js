import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div>
      <h1>Willkommen bei MovieApp</h1>
      <p>Bitte <Link to="/login">anmelden</Link> oder <Link to="/register">registrieren</Link>.</p>
    </div>
  );
}
