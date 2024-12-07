import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
<<<<<<<< Updated upstream:frontend/src/Components/Sidebar.jsx
    <nav className="sidebar">
      <div className="sidebar-top">
        <Link to="/" className="logo">AdminPanel</Link>
========
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">MovieSite</Link>
>>>>>>>> Stashed changes:frontend/src/Components/SideBar.jsx
      </div>
      <div className="sidebar-content">
        <ul>
          <li><Link to="/main/movies">Home</Link></li>
          <li><Link to="/main/favorites">Favorites</Link></li>
          <li><Link to="/main/search">Search</Link></li>
          <li><Link to="/main/settings">Settings</Link></li>
          <li><a onClick={() => localStorage.removeItem('accessToken')}>Logout</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
