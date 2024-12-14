import React, { useState } from 'react';
import axios from 'axios';

const AdminSearchMovie = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
 

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost/admin_search?query=${query}`);
      
      console.log(response.data.results[0].original_title); 
      if (response.data.results) {
        setResults(response.data.results); 
      } else {
        setResults([]); 
        setError('No results found.'); 
      }
      setError(null); 
    } catch (err) {
      setError('Error fetching data. Please try again.');
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Admin Search Movie</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie..."
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p>{error}</p>}

      <ul>
        {results.map((movie) => ( 
          <li key={movie.id}>{movie.original_title}</li> 
        ))}
      </ul>
    </div>
  );
};

export default AdminSearchMovie;