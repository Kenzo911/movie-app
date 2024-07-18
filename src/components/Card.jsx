import { useNavigate } from 'react-router-dom';
import './Card.css'; 

function Card({ movie }) {
  const navigate = useNavigate();
  return (
    <div className="card" style={{ width: "20rem", margin: "auto" }}>
      <img 
        onClick={() => {
          navigate(`/detail/${movie.id}`);
        }}
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        className="card-img-top hover-pointer"
        alt={`${movie.title}, Failed to load poster image for this Movie`}
      />
    </div>
  );
}

export default Card;
