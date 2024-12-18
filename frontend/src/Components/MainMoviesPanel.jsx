import React, { useState } from 'react';
import "./MainMoviesPanel.css";
import { useNavigate } from 'react-router-dom';

const MainMoviesPanel = ({ movies, onWatch, onAddToFavorites, onDeleteMovie }) => {
    const navigate = useNavigate();

    const handleAddMovie = () => {
        navigate("/admin_search");
    };

    const [expandedMovies, setExpandedMovies] = useState({});

    const toggleDescription = (movieId) => {
        setExpandedMovies((prev) => ({
            ...prev,
            [movieId]: !prev[movieId], // Toggle expanded state for the specific movie
        }));
    };

    return (
        <div className="main-movies-panel">
            <div className='head'>
                <h2 className="movies-header">Movies</h2>
                <button className='addMovieBtn' onClick={handleAddMovie}>Add Movie</button>
            </div>

            <div className="movies-cards">
                {movies && movies.length > 0 ? (
                    movies.map((movie) => {
                        const isExpanded = expandedMovies[movie.movieId] || false;
                        const descriptionPreview = movie.overview.length > 100
                            ? `${movie.overview.slice(0, 100)}...`
                            : movie.overview;

                        return (
                            <div
                                key={movie.movieId}
                                className={`movie-card ${isExpanded ? 'expanded' : ''}`}
                            >
                                <img
                                    src={`${movie.posterPath || 'default-poster.jpg'}`}
                                    alt={movie.title}
                                    className="movie-poster1"
                                />
                                <div className="movie-details">
                                    <h3 className="movie-title">{movie.title}</h3>
                                    <p className="movie-description">
                                        {isExpanded ? movie.overview : descriptionPreview}
                                        {movie.overview.length > 100 && (
                                            <span
                                                className="see-more"
                                                onClick={() => toggleDescription(movie.movieId)}
                                            >
                                                {isExpanded ? " See less" : " See more"}
                                            </span>
                                        )}
                                    </p>
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
                        );
                    })
                ) : (
                    <p>No movies available.</p>
                )}
            </div>
        </div>
    );
};

export default MainMoviesPanel;
