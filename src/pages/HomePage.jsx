import React from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import useFetchMovies from "../hooks/useFetchMovies";
import { Carousel } from 'react-bootstrap';

function HomePage() {
  const nowPlayingMovies = useFetchMovies('now_playing');
  const topRatedMovies = useFetchMovies('top_rated');
  const upcomingMovies = useFetchMovies('upcoming');

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
    <div style={{backgroundColor: 'black', minHeight: '100vh', 
    boxShadow: "4px 4px 4px 4px rgba(0,0,0,0.2)", marginBottom: "50px"}}>
      <Navbar />
      <div className="container-fluid text-center" style={{ backgroundColor: 'black', color: 'white'}}>
        <h2 className="my-4">PLAYING NOW</h2>
        <Carousel>
          {renderCarouselItems(nowPlayingMovies)}
        </Carousel>
      </div>
      <div className="container-fluid text-center" style={{ backgroundColor: 'black', color: 'white' }}>
        <h2 className="my-4">UPCOMING</h2>
        <Carousel>
          {renderCarouselItems(upcomingMovies)}
        </Carousel>
      </div>
      <div className="container-fluid text-center" style={{ backgroundColor: 'black', color: 'white' }}>
        <h2 className="my-4">TOP RATED</h2>
        <Carousel>
          {renderCarouselItems(topRatedMovies)}
        </Carousel>
      </div>
    </div>
  );
}

export default HomePage;
