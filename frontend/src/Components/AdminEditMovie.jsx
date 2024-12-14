import React from 'react';
import { useParams } from 'react-router-dom';

const AdminEditMovie = () => {
  const { tmdbId } = useParams(); // Get the TMDb ID from the URL

  return (
    <div>
      <h1>Edit Movie</h1>
      <p>Editing movie with TMDb ID: {tmdbId}</p>
      {/* Add your editing logic here */}
    </div>
  );
};

export default AdminEditMovie;