import React, { useState } from 'react';
import SideBar from '../Components/Sidebar';
import FeaturedMovies from '../Components/FeaturedMovies';
import MainMoviesPanel from '../Components/MainMoviesPanel';
import SearchBar from '../Components/SearchBar';
import FavoritesPanel from '../Components/FavoritesPanel';
import './HomePage.css';

const HomePage = () => {
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

  // Handle search input
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Filter movies based on search term
  const filteredMovies = movies
    ? movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Add to favorites
  const handleAddToFavorites = (movie) => {
    if (!favorites.some((fav) => fav.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  // Watch movie (example function)
  const handleWatch = (id) => {
    alert(`Watching movie with ID: ${id}`);
  };

  return (
    <div className="home-page">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="main-content">
        <div className="top-row">
          <div className="featured">
            <FeaturedMovies featured={filteredMovies.slice(0, 5)} />
          </div>
          <div className="search">
            <SearchBar onSearch={handleSearch} />
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
            <FavoritesPanel movies={favorites} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
