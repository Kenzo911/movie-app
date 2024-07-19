import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DetailPage.css';
import Navbar from '../components/Navbar';

function DetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${id}?&append_to_response=videos`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
      }
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        setMovie(json);
        setLoading(false);

        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isFav = favorites.some(favorite => favorite.id === json.id);
        setIsFavorite(isFav);
      })
      .catch(err => {
        console.error('error:' + err);
        setLoading(false);
      });
  }, [id]);

  const addToFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.some(favorite => favorite.id === movie.id)) {
      favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
      window.dispatchEvent(new Event('favoritesUpdated'));
      alert(`${movie.title} has been added to your favorites!`);
    }
  };

  const removeFromFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(favorite => favorite.id !== movie.id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorite(false);
    window.dispatchEvent(new Event('favoritesUpdated')); 
    alert(`${movie.title} has been removed from your favorites!`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="detail-container">
      <Navbar />
      <div className="poster">
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
      </div>
      <div className="movie-info">
        <h2 className="title">{movie.title}</h2>
        <p className="tagline">{movie.tagline}</p>
        <p className="description">{movie.overview}</p>
        <div className="additional-info">
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Duration:</strong> {movie.runtime} minutes</p>
          <p><strong>Vote Average:</strong> {movie.vote_average}/10</p>
          <p><strong>Vote Count:</strong> {movie.vote_count}</p>
        </div>
        <div className="genres">
          {movie.genres.map(genre => (
            <span key={genre.id} className="genre">{genre.name}</span>
          ))}
        </div>
        {isFavorite ? (
          <button onClick={removeFromFavorites} className="btn btn-danger mt-3">Remove from Favorites</button>
        ) : (
          <button onClick={addToFavorites} className="btn btn-primary mt-3">Add to Favorites</button>
        )}
      </div>
    </div>
  );
}

export default DetailPage;
