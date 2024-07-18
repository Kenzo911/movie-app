import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { Carousel } from 'react-bootstrap';

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

  const groupMovies = (movies, groupSize) => {
    const groups = [];
    for (let i = 0; i < movies.length; i += groupSize) {
      groups.push(movies.slice(i, i + groupSize));
    }
    return groups;
  };

  const renderCarouselItems = (movies) => {
    const movieGroups = groupMovies(movies, 3);
    return movieGroups.map((group, index) => (
      <Carousel.Item key={index}>
        <div className="d-flex justify-content-center">
          {group.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      </Carousel.Item>
    ));
  };

  return (
    <div style={{backgroundColor: 'black', color: 'white', minHeight: '100vh', borderRadius: "20px", boxShadow: "4px 4px 4px 4px rgba(0,0,0,0.2)"}}>
    <Navbar />
    <div className="container-fluid text-center" style={{ backgroundColor: 'black', color: 'white' }}>
      <div className="container mt-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2>{movies.length} results for "{query}"</h2>
            <Carousel>
              {renderCarouselItems(movies)}
            </Carousel>
          </>
        )}
      </div>
    </div>
  </div>
);
}

export default SearchPage;
