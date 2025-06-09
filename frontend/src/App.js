import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MovieListPage from './pages/MovieListPage';
import DashboardPage from './pages/DashboardPage';
import WatchlistPage from './pages/WatchlistPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/movies" element={<MovieListPage />} />
        
        {/* 🔁 Dynamisch nach Username */}
        <Route path="/dashboard/:username" element={<DashboardPage />} />
        <Route path="/watchlist/:username" element={<WatchlistPage />} />
      </Routes>
    </Router>
  );
}

export default App;
