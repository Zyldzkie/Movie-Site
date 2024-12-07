<<<<<<< Updated upstream
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import Sidebar from './Components/Sidebar';
import Register from './Register/Register';
import './App.css';

function App() {
  const isAuthenticated = !!localStorage.getItem('accessToken');

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Sidebar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />Y
          {/* Add other protected routes here */}
=======
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
>>>>>>> Stashed changes
        </Routes>
      </div>
    </Router>
  );
};

export default App;
