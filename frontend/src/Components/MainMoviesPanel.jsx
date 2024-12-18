import React, { useState, useEffect } from 'react';
import "./MainMoviesPanel.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MainMoviesPanel = ({ movies, onWatch, onDeleteMovie, onFavoriteUpdate, setGlobalFavorites }) => {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    const [userId, setUserId] = useState(null);
    const [expandedMovies, setExpandedMovies] = useState({});

    useEffect(() => {
        const fetchUserAndFavorites = async () => {
            try {
                const userResponse = await axios.get('http://localhost/get_user');
                setUserId(userResponse.data.UserID);
                
                const favoritesResponse = await axios.get(`http://localhost/get_favorite?userId=${userResponse.data.UserID}`);
                setFavorites(favoritesResponse.data.favorites || []);
            } catch (err) {
                console.error('Error fetching user data or favorites:', err);
            }
        };

        fetchUserAndFavorites();
    }, []);

    const handleFavoriteToggle = async (movie) => {
        try {
            const isFavorited = favorites.some(fav => fav.movieId === movie.movieId);
            
            if (isFavorited) {
                await axios.delete(`http://localhost/remove_favorite?movieId=${movie.movieId}&userId=${userId}`);
                const newFavorites = favorites.filter(fav => fav.movieId !== movie.movieId);
                setFavorites(newFavorites);
                setGlobalFavorites(newFavorites);
            } else {
                await axios.post('http://localhost/add_favorite', {
                    movieId: movie.movieId,
                    userId: userId
                });
                const newFavorites = [...favorites, movie];
                setFavorites(newFavorites);
                setGlobalFavorites(newFavorites);
            }
            
            if (onFavoriteUpdate) {
                onFavoriteUpdate();
            }
        } catch (err) {
            console.error('Error toggling favorite:', err);
        }
    };

    const handleAddMovie = () => {
        navigate("/admin_search");
    };

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
                        const isFavorited = favorites.some(fav => fav.movieId === movie.movieId);
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
                                        className={`favorite-button ${isFavorited ? 'favorited' : ''}`}
                                        onClick={() => handleFavoriteToggle(movie)}
                                    >
                                        {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
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
