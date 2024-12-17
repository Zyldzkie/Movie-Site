import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';
import FeaturedMovies from './FeaturedMovies';
import MainMoviesPanel from './MainMoviesPanel';
import SearchBar from './SearchBar';
import FavoritesPanel from './FavoritesPanel';
import axios from 'axios';
import './AdminEditMovie.css';

axios.defaults.withCredentials = true;

const AdminEditMovie = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: 'Inception',
      poster: 'https://via.placeholder.com/150',
      description: 'A mind-bending thriller about dreams within dreams.',
    },
    {
      id: 2,
      title: 'Interstellar',
      poster: 'https://via.placeholder.com/150',
      description: 'A journey beyond the stars to save humanity.',
    },
    {
      id: 3,
      title: 'The Dark Knight',
      poster: 'https://via.placeholder.com/150',
      description: 'A gritty and realistic take on Batman.',
    },
    
  ]);

  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost/get_user");
      console.log('User:', response.data);
    } catch (err) {
      console.error(err);
    }
  };
  

  useEffect(() => {
    getUser();
  }, []); 

  // Handle search input
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Filter movies based on search term
  const filteredMovies = searchTerm
    ? movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : movies;

  // Add to favorites
  const handleAddToFavorites = (movie) => {
    // Check if movie is already in favorites
    if (!favorites.some((fav) => fav.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  // Watch movie (example function)
  const handleWatch = (id) => {
    alert(`Watching movie with ID: ${id}`);
  };


  const { tmdbId } = useParams();

   

  return (
    <div className="home-page">
      <div className="sidebar">
        <NavBar />
      </div>
      <div className="main-content">
      <div>
      <h1>Edit Movie</h1>
      <p>Editing movie with TMDb ID: {tmdbId}</p>
    </div>
        <div className="top-row">
        <div className="search">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="featured">
            <FeaturedMovies featured={filteredMovies.slice(0, 5)} />
          </div>
        </div>
        <div className="bottom-row">
          <div className="main-movies">
            <MainMoviesPanel
              movies={filteredMovies}
              onWatch={handleWatch}
              onAddToFavorites={handleAddToFavorites}
            />
          </div>
          <div className="favorites">
            <FavoritesPanel favorites={favorites} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditMovie;
