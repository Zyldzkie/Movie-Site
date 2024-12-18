import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FavoritesPanel.css';

const FavoritesPanel = ({ globalFavorites, setGlobalFavorites }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserAndFavorites = async () => {
      try {
        const userResponse = await axios.get('http://localhost/get_user');
        setUserId(userResponse.data.UserID);
        
        const favoritesResponse = await axios.get(`http://localhost/get_favorite?userId=${userResponse.data.UserID}`);
        setGlobalFavorites(favoritesResponse.data.favorites || []);
      } catch (err) {
        console.error('Error fetching favorites:', err);
      }
    };

    fetchUserAndFavorites();
  }, [setGlobalFavorites]);

  const handleRemoveFavorite = async (movieId) => {
    try {
      await axios.delete(`http://localhost/remove_favorite?movieId=${movieId}&userId=${userId}`);
      const newFavorites = globalFavorites.filter(movie => movie.movieId !== movieId);
      setGlobalFavorites(newFavorites);
    } catch (err) {
      console.error('Error removing favorite:', err);
    }
  };

  if (globalFavorites.length === 0) {
    return <div className="favorites-panel">No favorites added yet.</div>;
  }

  return (
    <div className="favorites-panel">
      <h2 className="favorites-header">Favorites</h2>
      <div className="favorites-cards">
        {globalFavorites.map((movie) => (
          <div key={movie.movieId} className="favorite-card">
            <img 
              src={movie.posterPath || 'default-poster.jpg'} 
              alt={movie.title} 
              className="favorite-poster" 
            />
            <h3 className="favorite-title">{movie.title}</h3>
            <button
              className="remove-favorite"
              onClick={() => handleRemoveFavorite(movie.movieId)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPanel;
