import React, { useEffect, useState } from 'react';
import './FeaturedMovies.css';

const FeaturedMovies = () => {
  const [featured, setFeatured] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        const response = await fetch('/featured_movie'); 
        const data = await response.json();

        if (response.ok) {
          setFeatured(data); 
        } else {
          throw new Error('Failed to fetch featured movies');
        }
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchFeaturedMovies();
  }, []); 

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className="featured-movies">
      <h1>Featured Movies</h1>
      <div className="movies-grid">
        {featured.map((movie) => (
          <div key={movie.movieId} className="movie-card">
            <img className="movie-poster" src={movie.posterPath} alt={movie.title} />
            <h3 className="movie-title">{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedMovies;
