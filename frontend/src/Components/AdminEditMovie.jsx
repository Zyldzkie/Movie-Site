import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './AdminEditMovie.css';

const AdminEditMovie = () => {
  const { tmdbId } = useParams();
  const [movieDetails, setMovieDetails] = useState([]);
  const [error, setError] = useState(null);

  const [dateCreated, setDateCreated] = useState(null);
  const [dateUpdated, setDateUpdated] = useState(null);
  const [isFeatured, setIsFeatured] = useState(null);

  const [newCastMember, setNewCastMember] = useState({ original_name: '', profile_path: '', character: '' });
  const [newPhoto, setNewPhoto] = useState({ file_path: '', description: '' });
  const [newVideo, setNewVideo] = useState({ name: '', site: '', videoKey: '', type: '', official: false });

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://localhost/admin_edit?tmbd_id=${tmdbId}`);
        setMovieDetails(response.data);
      } catch (err) {
        setError('Error fetching movie details.');
      }
    };

    fetchMovieDetails();

  }, [tmdbId]);

  const handleAddMovie = async () => {

    // Call UserId from cookies
    // MovieId, photoId, videoId, castId is already auto generated
    // Is Featured is already false by default
    // tmbd_id is in the params
    // Set the creation date field to datetime now as well as the updated date to now

    // Admin add here php justin

    console.log(movieDetails);
  };

  const handleAddCastMember = () => {
    setMovieDetails({ ...movieDetails, cast: [...movieDetails.cast, newCastMember] });
    setNewCastMember({ original_name: '', profile_path: '', character: '' });
  };

  const handleAddPhoto = () => {
    setMovieDetails({ ...movieDetails, posters: [...movieDetails.posters, newPhoto] });
    setNewPhoto({ file_path: '', description: '' });
  };

  const handleAddVideo = () => {
    setMovieDetails({ ...movieDetails, results: [...movieDetails.results, newVideo] });
    setNewVideo({ key: '', name: '', site: '', type: '', official: false });
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!movieDetails || !movieDetails.results || !Array.isArray(movieDetails.results)) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div>
        <label>Title:</label>
        <input type="text" value={movieDetails.title} onChange={(e) => setMovieDetails({ ...movieDetails, title: e.target.value })} />
      </div>
      <div>
        <label>Overview:</label>
        <textarea value={movieDetails.overview} onChange={(e) => setMovieDetails({ ...movieDetails, overview: e.target.value })} />
      </div>
      <div>
        <label>Popularity:</label>
        <input type="number" step="0.1" value={movieDetails.popularity} onChange={(e) => setMovieDetails({ ...movieDetails, popularity: e.target.value })} />
      </div>
      <div>
        <label>Release Date:</label>
        <input type="text" value={movieDetails.release_date} onChange={(e) => setMovieDetails({ ...movieDetails, release_date: e.target.value })} />
      </div>
      <div>
        <label>Vote Average:</label>
        <input type="number" step="0.1" value={movieDetails.vote_average} onChange={(e) => setMovieDetails({ ...movieDetails, vote_average: e.target.value })} />
      </div>
      <div>
        <label>Backdrop Path:</label>
        <input type="text" value={movieDetails.backdrop_path} onChange={(e) => setMovieDetails({ ...movieDetails, backdrop_path: e.target.value })} />
      </div>
      <div>
        <label>Poster Path:</label>
        <input type="text" value={movieDetails.poster_path} onChange={(e) => setMovieDetails({ ...movieDetails, poster_path: e.target.value })} />
      </div>


      <h1>Cast</h1>
      {movieDetails.cast.map((member, index) => 
        <div key={index}>
          <label>Name:</label>
          <input type="text" value={member.original_name} 
          onChange={(e) => setMovieDetails({ ...movieDetails, cast: movieDetails.cast.map((item, i) => i === index ? { ...item, name: e.target.value } : item) })} />
          <label>URL:</label>
          <input type="text" value={member.profile_path} 
          onChange={(e) => setMovieDetails({ ...movieDetails, cast: movieDetails.cast.map((item, i) => i === index ? { ...item, profile_path: e.target.value } : item) })} />
          <label>Character Name:</label>
          <input type="text" value={member.character} 
          onChange={(e) => setMovieDetails({ ...movieDetails, cast: movieDetails.cast.map((item, i) => i === index ? { ...item, character: e.target.value } : item) })} />
        </div>)}
      <div>
        <h2>Add New Cast Member</h2>
        <label>Name:</label>
        <input type="text" value={newCastMember.original_name} onChange={(e) => setNewCastMember({ ...newCastMember, original_name: e.target.value })} />
        <label>URL:</label>
        <input type="text" value={newCastMember.profile_path} onChange={(e) => setNewCastMember({ ...newCastMember, profile_path: e.target.value })} />
        <label>Character Name:</label>
        <input type="text" value={newCastMember.character} onChange={(e) => setNewCastMember({ ...newCastMember, character: e.target.value })} />
        <button onClick={handleAddCastMember}>Add Cast Member</button>
      </div>


      <h1>Photos</h1>
      {movieDetails.posters.map((poster, index) => 
        <div key={index}>
          <label>URL:</label>
          <input type="text" value={poster.file_path} 
          onChange={(e) => setMovieDetails({ ...movieDetails, posters: movieDetails.posters.map((item, i) => i === index ? { ...item, file_path: e.target.value} : item) })} />
          {/* <label>Description:</label>
          <input type="text" value={poster.description} 
          onChange={(e) => setMovieDetails({ ...movieDetails, posters: movieDetails.posters.map((item, i) => i === index ? { ...item, description: e.target.value } : item) })} /> */}
        </div>)}
      <div>
        <h2>Add New Photo</h2>
        <label>URL:</label>
        <input type="text" value={newPhoto.file_path} onChange={(e) => setNewPhoto({ ...newPhoto, file_path: e.target.value })} />
        {/* <label>Description:</label>
        <input type="text" value={newPhoto.description} onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })} /> */}
        <button onClick={handleAddPhoto}>Add Photo</button>
      </div>

      <h1>Videos</h1>
      {movieDetails.results.map((result, index) => 
        <div key={index}>
          <label>Key:</label>
          <input type="text" value={result.key} 
          onChange={(e) => setMovieDetails({ ...movieDetails, results: movieDetails.results.map((item, i) => i === index ? { ...item, key: e.target.value } : item) })} />
          <label>Name:</label>
          <input type="text" value={result.name} 
          onChange={(e) => setMovieDetails({ ...movieDetails, results: movieDetails.results.map((item, i) => i === index ? { ...item, name: e.target.value } : item) })} />
          <label>Site:</label>
          <input type="text" value={result.site} 
          onChange={(e) => setMovieDetails({ ...movieDetails, results: movieDetails.results.map((item, i) => i === index ? { ...item, site: e.target.value } : item) })} />
          <label>Video Type:</label>
          <input type="text" value={result.type} 
          onChange={(e) => setMovieDetails({ ...movieDetails, results: movieDetails.results.map((item, i) => i === index ? { ...item, type: e.target.value } : item) })} />
          <label>Official:</label>
          <input type="checkbox" checked={result.official} 
          onChange={(e) => setMovieDetails({ ...movieDetails, results: movieDetails.results.map((item, i) => i === index ? { ...item, official: e.target.checked } : item) })} />
        </div>)}
      <div>
        <h2>Add New Video</h2>
        <label>Key:</label>
        <input type="text" value={newVideo.key} onChange={(e) => setNewVideo({ ...newVideo, key: e.target.value })} />
        <label>Name:</label>
        <input type="text" value={newVideo.name} onChange={(e) => setNewVideo({ ...newVideo, name: e.target.value })} />
        <label>Site:</label>
        <input type="text" value={newVideo.site} onChange={(e) => setNewVideo({ ...newVideo, site: e.target.value })} />
        <label>Video Type:</label>
        <input type="text" value={newVideo.type} onChange={(e) => setNewVideo({ ...newVideo, type: e.target.value })} />
        <label>Official:</label>
        <input type="checkbox" value={newVideo.official} onChange={(e) => setNewVideo({ ...newVideo, official: e.target.value })} />
       
        
        <button onClick={handleAddVideo}>Add Video</button>
      </div>

      <button onClick={handleAddMovie}>Add Movie</button>
    </div>
  );
};

export default AdminEditMovie;