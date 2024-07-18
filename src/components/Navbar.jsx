import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Avatar from '../assets/images/avatar.png';

function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(query)}`); 
    }
  };

  return (
    <nav className="navbar text-white fixed-top" style={{ marginLeft: "250px", backgroundColor: "black" }}>
      <div className="container-fluid" style={{ marginTop: "20px"}}>
        <form className="d-flex" role="search" onSubmit={handleSearch} 
          style={{marginLeft:"35px"}}
        >
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-outline-danger" type="submit">Search</button>
        </form>
        <a className="navbar-brand text-white"><img src={Avatar} alt="Avatar" /></a>
      </div>
    </nav>
  );
}

export default Navbar;
