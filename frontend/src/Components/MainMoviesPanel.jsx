import React from "react";
import "./MainMoviesPanel.css";

const MainMoviesPanel = ({ movies, onWatch }) => {
  return (
    <div className="main-movies-panel">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <img src={movie.poster} alt={movie.title} className="movie-poster" />
          <div className="movie-details">
            <h3 className="movie-title">{movie.title}</h3>
            <p className="movie-description">{movie.description}</p>
            <button
              className="watch-button"
              onClick={() => onWatch(movie.id)}
            >
              Watch
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainMoviesPanel;
