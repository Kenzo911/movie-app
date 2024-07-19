import React from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import useFetchMovies from "../hooks/useFetchMovies";
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  const renderCarouselItems = (movies, groupSize) => {
    const movieGroups = groupMovies(movies, groupSize);
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
    <div style={{ backgroundColor: 'black', minHeight: '100vh', boxShadow: "4px 4px 4px 4px rgba(0,0,0,0.2)", marginBottom: "50px" }}>
      <Navbar />
      <div className="container-fluid text-center" style={{ backgroundColor: 'black', color: 'white' }}>
        <h2 className="my-4">PLAYING NOW</h2>
        <div className="d-block d-md-none">
          <Carousel>
            {renderCarouselItems(nowPlayingMovies, 1)}
          </Carousel>
        </div>
        <div className="d-none d-md-block d-lg-none">
          <Carousel>
            {renderCarouselItems(nowPlayingMovies, 2)}
          </Carousel>
        </div>
        <div className="d-none d-lg-block">
          <Carousel>
            {renderCarouselItems(nowPlayingMovies, 3)}
          </Carousel>
        </div>
      </div>
      <div className="container-fluid text-center" style={{ backgroundColor: 'black', color: 'white' }}>
        <h2 className="my-4">UPCOMING</h2>
        <div className="d-block d-md-none">
          <Carousel>
            {renderCarouselItems(upcomingMovies, 1)}
          </Carousel>
        </div>
        <div className="d-none d-md-block d-lg-none">
          <Carousel>
            {renderCarouselItems(upcomingMovies, 2)}
          </Carousel>
        </div>
        <div className="d-none d-lg-block">
          <Carousel>
            {renderCarouselItems(upcomingMovies, 3)}
          </Carousel>
        </div>
      </div>
      <div className="container-fluid text-center" style={{ backgroundColor: 'black', color: 'white' }}>
        <h2 className="my-4">TOP RATED</h2>
        <div className="d-block d-md-none">
          <Carousel>
            {renderCarouselItems(topRatedMovies, 1)}
          </Carousel>
        </div>
        <div className="d-none d-md-block d-lg-none">
          <Carousel>
            {renderCarouselItems(topRatedMovies, 2)}
          </Carousel>
        </div>
        <div className="d-none d-lg-block">
          <Carousel>
            {renderCarouselItems(topRatedMovies, 3)}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
