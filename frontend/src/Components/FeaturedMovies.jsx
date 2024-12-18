import React, { useEffect, useState } from 'react';
import './FeaturedMovies.css';
import axios from 'axios';

const FeaturedMovies = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const searchFeatured = async () => {
    try {
      const response = await axios.get("http://localhost/get_featured");
      if (Array.isArray(response.data)) { // Ensure response data is an array
        setFeatured(response.data);
        setError(null);
      } else {
        setFeatured([]); // Default to an empty array
        setError('No results found.');
      }
    } catch (err) {
      setError('Error fetching data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false); // Stop loading state after API call
    }
  };

  useEffect(() => {
    searchFeatured();
  }, []); 

  useEffect(() => {
    if (featured.length > 0) {
      console.log('Featured:', featured);
    }
  }, [featured]);

  return (
    <div className="featured-movies">
      <h1 className='featHeader'>Featured Movies</h1>
      {loading ? ( // Show a loading message
        <p>Loading featured movies...</p>
      ) : error ? ( // Show an error message if there is one
        <p>{error}</p>
      ) : featured.length === 0 ? ( // Show a fallback if no movies are found
        <p>No featured movies available at the moment.</p>
      ) : (
        <div className="featured-movies-grid">
          {featured.slice(0, 6).map((movie) => (
            <div key={movie.movieId} className="featured-movie-card">
              <img
                className="featured-movie-poster"
                src={movie.posterPath || 'default-poster.jpg'}
                alt={movie.title}
              />
              <h3 className="featured-movie-title">{movie.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedMovies;
