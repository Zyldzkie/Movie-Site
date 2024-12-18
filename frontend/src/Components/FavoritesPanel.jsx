import React from 'react';
import './FavoritesPanel.css';

const FavoritesPanel = ({ favorites = [] }) => {
  if (favorites.length === 0) {
    return <div className="favorites-panel">No favorites added yet.</div>;
  }

  return (
    <div className="favorites-panel">
      <h2 className="favorites-header">Favorites</h2>
      <div className="favorites-cards">
        {favorites.map((movie) => (
          <div key={movie.id} className="favorite-card">
            <img 
              src={movie.posterPath || 'default-poster.jpg'} 
              alt={movie.title} 
              className="favorite-poster" 
            />
            <h3 className="favorite-title">{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPanel;
