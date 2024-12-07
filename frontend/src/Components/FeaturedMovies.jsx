import React from 'react';
import Slider from 'react-slick';
import './FeaturedMovies.css';

const FeaturedMovies = ({ featured = [] }) => {
  // Slick slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="featured-movies">
      <h1>Featured Movies</h1>
      <Slider {...settings}>
        {featured.map((movie) => (
          <div key={movie.id} className="carousel-slide">
            <img className="carousel-poster" src={movie.poster} alt={movie.title} />
            <h3 className="carousel-title">{movie.title}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedMovies;
