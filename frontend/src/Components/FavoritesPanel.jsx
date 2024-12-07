import React from 'react';
import './FavoritesPanel.css';

const FavoritesPanel = ({ favorites = [] }) => {
  if (favorites.length === 0) {
    return <div className="favorites-panel">No favorites added yet.</div>;
  }

  return (
    <div className="favorites-panel">
      {favorites.map((movie) => (
        <div key={movie.id} className="favorite-card">
          <img src={movie.poster} alt={movie.title} />
          <h3>{movie.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default FavoritesPanel;
