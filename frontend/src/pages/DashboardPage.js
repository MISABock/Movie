import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 hinzufügen für Navigation

function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [filteredTitles, setFilteredTitles] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const username = localStorage.getItem('username');
  const navigate = useNavigate(); // 👈 Navigation-Funktion

  useEffect(() => {
    fetch('http://localhost:8080/api/movies')
      .then((res) => res.json())
      .then(setMovies)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!username) return;
    fetch(`http://localhost:8080/api/watchlist/${username}`)
      .then((res) => res.json())
      .then(setWatchlist)
      .catch(console.error);
  }, [username]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredTitles([]);
      return;
    }

    const suggestions = movies
      .filter((m) => m?.Title?.toLowerCase().startsWith(searchTerm.toLowerCase()))
      .map((m) => m.Title);

    setFilteredTitles(suggestions.slice(0, 5));
  }, [searchTerm, movies]);

  const displayedMovies = searchTerm.trim()
    ? movies.filter((m) => m?.Title?.toLowerCase().includes(searchTerm.toLowerCase()))
    : movies;

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const addToWatchlist = (movie) => {
    const entry = {
      username,
      imdbID: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      type: movie.Type,
      poster: movie.Poster
    };

    fetch('http://localhost:8080/api/watchlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry)
    })
      .then((res) => {
        if (!res.ok) throw new Error('Fehler beim Speichern');
        return res.json();
      })
      .then((savedMovie) => {
        setWatchlist((prev) => [...prev, savedMovie]);
      })
      .catch(console.error);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Willkommen im Dashboard</h2>
      <p>Du bist eingeloggt als <b>{username || 'unbekannt'}</b>.</p>

      {/* 🆕 Button zur Watchlist */}
      <button
        onClick={() => navigate(`/watchlist/${username}`)}
        style={{
          marginBottom: '1.5rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        ➤ Meine Watchlist ansehen
      </button>

      <form onSubmit={handleSearch} style={{ marginTop: '1rem', position: 'relative' }}>
        <input
          type="text"
          placeholder="Suche nach einem Film..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '0.5rem', width: '300px' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem', marginLeft: '1rem' }}>
          Suchen
        </button>

        {filteredTitles.length > 0 && (
          <ul style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            background: 'white',
            border: '1px solid #ccc',
            width: '300px',
            marginTop: '0.25rem',
            listStyle: 'none',
            padding: 0,
            zIndex: 10,
          }}>
            {filteredTitles.map((title, idx) => (
              <li
                key={idx}
                onClick={() => setSearchTerm(title)}
                style={{ padding: '0.5rem', cursor: 'pointer' }}
              >
                {title}
              </li>
            ))}
          </ul>
        )}
      </form>

      <h3 style={{ marginTop: '3rem' }}>Gefundene Filme:</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {displayedMovies.map((movie, idx) => {
        const isInWatchlist = watchlist.some((item) => item.imdbID === movie.imdbID);

        return (
          <div
            key={movie.imdbID || idx}
            style={{
              border: '1px solid #ccc',
              padding: '1rem',
              width: '200px',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <img
              src={
                movie.Poster && movie.Poster !== 'N/A'
                  ? movie.Poster
                  : 'https://dummyimage.com/200x300/cccccc/000000&text=Kein+Bild'
              }
              alt={movie.Title}
              style={{ width: '100%', height: 'auto' }}
            />
            <h4>{movie.Title}</h4>
            <p>{movie.Year}</p>
            <button
              onClick={() => addToWatchlist(movie)}
              disabled={isInWatchlist}
              style={{
                marginTop: '0.5rem',
                padding: '0.4rem 0.8rem',
                backgroundColor: isInWatchlist ? '#28a745' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isInWatchlist ? 'default' : 'pointer',
              }}
            >
              {isInWatchlist ? 'Auf der Liste' : 'Zur Liste hinzufügen'}
            </button>
          </div>
        );
      })}

      </div>

      <h3 style={{ marginTop: '3rem' }}>Meine Liste:</h3>
      {watchlist.length === 0 ? (
        <p>Deine Liste ist leer.</p>
      ) : (
        <ul>
          {watchlist.map((movie) => (
            <li key={movie.imdbID}>{movie.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DashboardPage;
