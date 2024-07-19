import React, { useEffect, useState } from 'react';
import Card from '../components/Card'; 
import Navbar from '../components/Navbar'; 

function FavoritePage() {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = () => {
    const favoritesFromStorage = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(favoritesFromStorage);
  };

  useEffect(() => {
    fetchFavorites();

    const handleFavoritesUpdated = () => {
      fetchFavorites();
    };

    window.addEventListener('favoritesUpdated', handleFavoritesUpdated);

    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdated);
    };
  }, []);

  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh', color: 'white' }}>
      <Navbar />
      <div className="container py-4">
        <h2 className="text-center mb-4">Your Favorites</h2>
        <div className="row">
          {favorites.length === 0 ? (
            <div className="col-12 text-center">
              <p>No favorites added yet.</p>
            </div>
          ) : (
            favorites.map((favorite) => (
              <div key={favorite.id} className="col-12 col-md-6 col-lg-4 mb-4">
                <Card movie={favorite} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default FavoritePage;
