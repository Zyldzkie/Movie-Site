import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import Sidebar from './Components/Sidebar';
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
          {/* Add other protected routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
