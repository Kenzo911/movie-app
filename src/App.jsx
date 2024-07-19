import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage'; 
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import FavoritePage from './pages/FavoritePage';

function App() {
  return (
    <Router basename="/movie-app">
      <div>
        {/* <Sidebar /> */}
        <div className="content" style={{paddingTop: '70px', backgroundColor: 'black', color: 'black', minHeight: '100vh' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="favorites" element={<FavoritePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="detail/:id" element={<DetailPage />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
