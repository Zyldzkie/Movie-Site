import React, { useEffect, useState } from 'react';
import './FeaturedMovies.css';

const FeaturedMovies = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        // Using dummy data for development purposes
        const dummyData = [
          { movieId: 1, title: 'Inception', posterPath: 'https://via.placeholder.com/150' },
          { movieId: 2, title: 'The Dark Knight', posterPath: 'https://via.placeholder.com/150' },
          { movieId: 3, title: 'Interstellar', posterPath: 'https://via.placeholder.com/150' },
          { movieId: 4, title: 'Dune', posterPath: 'https://via.placeholder.com/150' },
          { movieId: 5, title: 'Avengers: Endgame', posterPath: 'https://via.placeholder.com/150' },
          { movieId: 6, title: 'Avengers: NIgga', posterPath: 'https://via.placeholder.com/150' }
        ];

        // Simulate backend API request delay
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay

        setFeatured(dummyData);
      } catch (err) {
        setError('Failed to fetch featured movies.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedMovies();
  }, []);

  // Render loading state
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div className="error">{error}</div>;
  }

  // Render movies in a single row
  return (
    <div className="featured-movies">
      <h1>Featured Movies</h1>
      <div className="movies-grid">
        {featured.slice(0, 6).map((movie) => (
          <div key={movie.movieId} className="movie-card">
            <img
              className="movie-posterr"
              src={movie.posterPath}
              alt={movie.title}
            />
            <h3 className="movie-title">{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedMovies;
