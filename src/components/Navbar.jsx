import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import Avatar from '../assets/images/avatar.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

function Navbar() {
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(query)}`);
      setShowSearch(false); 
    }
  };

  const toggleSearchBar = () => {
    setShowSearch(!showSearch);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-black">
      <div className="container-fluid d-flex justify-content-between align-items-center px-3">
        <Link to="/" className="navbar-brand" style={{ fontSize: '24px', fontWeight: 'bold', color: 'red' }}>
          KENZOFLIX
        </Link>
        <div className="d-flex align-items-center flex-grow-1">
          {showSearch && (
            <form className="d-flex flex-grow-1" role="search" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          )}
          <div className="avatar-container d-flex align-items-center ms-auto">
            <Dropdown align="end">
              <Dropdown.Toggle variant="black" id="dropdown-basic" className="p-0 m-0 border-0 bg-transparent">
                <img src={Avatar} alt="Avatar" className="avatar-image" style={{marginLeft:"120px"}} />
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ backgroundColor: 'black', border: '1px solid white' }}>
                <Dropdown.Item as={Link} to="/favorites" className="text-white dropdown-item">
                  Favorites
                </Dropdown.Item>
                <Dropdown.Item onClick={toggleSearchBar} className="text-white dropdown-item">
                  Search
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/about" className="text-white dropdown-item">
                  About
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
