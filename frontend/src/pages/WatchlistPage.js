import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const backendBaseUrl = "http://moviebackend-wnsu.onrender.com/api";

function WatchlistPage() {
  const { username } = useParams(); // 👈 aus der URL z.B. /watchlist/misa
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (!username) return;

      fetch(`${backendBaseUrl}/watchlist/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setWatchlist(data);
      })
      .catch((err) => {
        console.error('Fehler beim Laden der Watchlist:', err);
      });
  }, [username]);

  const removeFromWatchlist = (imdbID) => {
    fetch(`${backendBaseUrl}/watchlist/${username}/${imdbID}`, 
      {      method: 'DELETE',
      })
      .then((res) => {
        if (!res.ok) throw new Error('Fehler beim Entfernen');
        setWatchlist((prev) => prev.filter((movie) => movie.imdbID !== imdbID));
      })
      .catch((err) => {
        console.error('Fehler beim Entfernen des Films:', err);
      });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Watchlist von <b>{username}</b></h2>

      {watchlist.length === 0 ? (
        <p>Diese Watchlist ist leer.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {watchlist.map((movie) => (
            <div
              key={movie.imdbID}
              style={{
                border: '1px solid #ccc',
                padding: '1rem',
                width: '200px',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <img
                src={movie.poster !== 'N/A' ? movie.poster : 'https://dummyimage.com/200x300/cccccc/000000&text=Kein+Bild'}
                alt={movie.title}
                style={{ width: '100%' }}
              />
              <h4>{movie.title}</h4>
              <p>{movie.year}</p>
              <button
                onClick={() => removeFromWatchlist(movie.imdbID)}
                style={{ marginTop: '0.5rem', padding: '0.5rem', width: '100%' }}
              >
                Entfernen
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WatchlistPage;
