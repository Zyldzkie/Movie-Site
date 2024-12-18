import React from 'react';
import "./MainMoviesPanel.css";
import FavoritesPanel from './FavoritesPanel';
import { useNavigate } from 'react-router-dom';

const MainMoviesPanel = ({ movies, onWatch, onAddToFavorites, onDeleteMovie }) => {
  const navigate = useNavigate();

  const handleAddMovie = () => {
    navigate("/admin_search");
  }

  return (
    <div className="main-movies-panel">
      {/* Header Section */}
      <div>
        <h2 className="movies-header">Movies</h2>
        <button onClick={handleAddMovie}>Add Movie</button>
      </div>

      {/* Movie Cards */}
      <div className="movies-cards">
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.movieId} className="movie-card">
              <img
                src={`${movie.posterPath || 'default-poster.jpg'}`}
                alt={movie.title}
                className="movie-poster1"
              />
              <div className="movie-details">
                <h3 className="movie-title">{movie.title}</h3>
                <p className="movie-description">{movie.overview}</p>
                <button
                  className="watch-button"
                  onClick={() => onWatch(movie.movieId)}
                >
                  Watch
                </button>
                <button
                  className="watch-button"
                  onClick={() => onAddToFavorites(movie)}
                >
                  Add to Favorites
                </button>
                <button
                  className="watch-button"
                  onClick={() => onDeleteMovie(movie.movieId)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No movies available.</p>
        )}
      </div>
    </div>
  );
};

export default MainMoviesPanel;