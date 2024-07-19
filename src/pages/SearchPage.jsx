import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Card from "../components/Card";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const query = useQuery().get('query');

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${import.meta.env.VITE_TMDB_API_KEY}`; 
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
        setMovies(json.results); 
        setLoading(false);
      })
      .catch(err => {
        console.error('error:' + err);
        setLoading(false);
      });
  }, [query]);

  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh', color: 'white' }}>
      <Navbar />
      <div className="container py-4">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <>
            <h2 className="text-center mb-4">{movies.length} results for "{query}"</h2>
            <div className="row">
              {movies.map((movie) => (
                <div key={movie.id} className="col-12 col-md-6 col-lg-4 mb-4">
                  <Card movie={movie} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
