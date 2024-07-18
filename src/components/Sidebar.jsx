import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
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
    <div className="text-white d-flex flex-column" style={{ width: '250px', height: '100vh', position: 'fixed', top: '0', overflowY: 'auto', backgroundColor: "black"}}>
      <div className="d-flex flex-column" style={{backgroundColor:"black"}}>
        <Link to="/" className="list-group-item list-group-item-action text-white font-weight-bold text-center">
          <h2 style={{marginTop: "40px", color: "red"}}>KENZOFLIX</h2>
          <br />
        </Link>
      </div>
      <div className="row" style={{height: "100%", backgroundColor:"black", overflowY: 'auto'}}>
        <div className="list-group list-group-flush" style={{backgroundColor: "black"}}>
          <div className="list-group-item list-group-item-action text-white text-center" style={{backgroundColor:"black"}}>
            Favorites
          </div>
          {favorites.map((favorite) => (
            <Link key={favorite.id} to={`/detail/${favorite.id}`} className="list-group-item list-group-item-action text-white" style={{backgroundColor: "black", marginLeft:"5px"}}>
              {favorite.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
