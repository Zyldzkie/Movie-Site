import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage'; // Import the HomePage component
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        {/* Routes define which component to load based on the URL */}
        <Routes>
          {/* Default route loads the HomePage */}
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
