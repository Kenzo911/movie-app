import React from 'react';
import Navbar from '../components/Navbar';
function AboutPage() {
  return (
    <div className="container" style={{ backgroundColor: 'black', color: 'white' }}>
      <Navbar />
      <h2 className="my-4">About Kenzoflix</h2>
      <p>This web is only for non commercial only and entertainment purposes</p>
    </div>
  );
}

export default AboutPage;