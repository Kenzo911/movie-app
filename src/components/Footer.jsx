import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="text-white text-center py-3 fixed-bottom" style={{backgroundColor:"black", height:"50px"}}>
      <Link to="/about" style={{textDecoration: 'none'}}>
        <p style={{color:"white", marginBottom:"20px"}}>Non Commercial Use</p>
      </Link>
    </footer>
  );
}

export default Footer;
