import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage'; // Import the HomePage component
import './App.css';
import EditMovie from './Components/EditMovie';
import AddMovie from './Components/AddMovie';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add_movie" element={<AddMovie />} />
          <Route path="/edit_movie" element={<EditMovie />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
