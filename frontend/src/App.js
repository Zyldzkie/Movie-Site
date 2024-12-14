import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AdminSearchMovie from './Components/AdminSearchMovie';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />


          {/* START test routess remove after...*/}
          <Route path="/admin_search" element={<AdminSearchMovie />} />
           {/* END test routess remove after...*/}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
