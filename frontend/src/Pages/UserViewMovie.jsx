import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./UserViewMovie.css"; 

const UserViewMovie = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({
    title: "",
    overview: "",
    popularity: 0,
    release_date: "",
    vote_average: 0,
    backdrop_path: "",
    poster_path: "",
    cast: [],
    posters: [],
    results: [],
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost/get_movie?movieId=${movieId}`
        );
        
        if (response.data.error) {
          setError(response.data.error);
          return;
        }

        setMovieDetails(response.data);

      } catch (err) {
        setError("Error fetching movie details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="wholecont">
      <div className="movie-container">
        {/* Movie Card Section */}
        <div
          className="movie-cardto"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url(${movieDetails.backdrop_path})`,
          }}
        >
          {/* Left Column - Movie Details */}
          <div className="poster-container">
            <img
              src={movieDetails.poster_path}
              alt={movieDetails.title}
              className="poster-img"
            />
          </div>

          {/* Right Column - Movie Details */}
          <div className="details">
            <h1 className="movie-title">{movieDetails.title}</h1>
            <p className="movie-overview">{movieDetails.overview}</p>
            <div className="movie-info">
              <p><strong>Popularity:</strong> {movieDetails.popularity}</p>
              <p><strong>Release Date:</strong> {movieDetails.release_date}</p>
              <p><strong>Vote Average:</strong> {movieDetails.vote_average}</p>
            </div>
          </div>
        </div>

        {/* Cast Section */}
        {movieDetails.cast.length > 0 && (
          <>
            <h2 className="section-header">Cast</h2>
            <div className="cast-section">
              {movieDetails.cast.map((member, index) => (
                <div key={index} className="cast-item">
                  <img 
                    src={member.url} 
                    alt={member.name} 
                    className="cast-image"
                    onError={(e) => {
                      e.target.src = 'default-profile.jpg';
                    }}
                  />
                  <h3>{member.name}</h3>
                  <p>{member.character}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Photos Section */}
        {movieDetails.posters.length > 0 && (
          <>
            <h2 className="section-header">Photos</h2>
            <div className="photo-gallery">
              {movieDetails.posters.map((poster, index) => (
                <div key={index} className="photo-card">
                  <img
                    src={poster.url}
                    alt={`Poster ${index + 1}`}
                    className="poster-image"
                    onError={(e) => {
                      e.target.src = 'default-poster.jpg';
                    }}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Videos Section */}
        {movieDetails.videos.length > 0 && (
          <>
            <h2 className="section-header">Videos</h2>
            <div className="video-gallery">
              {movieDetails.videos.map((video, index) => (
                <div key={index} className="video-card">
                  <iframe
                    src={video.url}
                    title={video.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="video-frame"
                  />
                  <h3 className="video-title">{video.name}</h3>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserViewMovie; 