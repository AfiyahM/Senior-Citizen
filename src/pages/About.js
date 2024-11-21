import React from 'react';
import './About.css'; // Import the CSS file

const About = () => {
  return (
    <div className="container">
      <h1 className="main-heading">About Senior Connect</h1>
      <p className="description">
        Senior Connect is a platform aimed at empowering seniors with essential digital skills.
      </p>
      
      <h2 className="sub-heading">Our Mission</h2>
      <p className="text">
        To help seniors gain confidence in using technology to stay connected with loved ones and manage daily activities.
      </p>
      
      <h2 className="sub-heading">The Team</h2>
      <p className="text">
        Our dedicated team is passionate about making technology accessible for everyone.
      </p>
    </div>
  );
};

export default About;
