import React from 'react';
import './Home.css';
import heroImage from './assets/hero-image.png';
import whatsappIcon from './assets/whatsapp-icon.png';
import amazonIcon from './assets/amazon-icon.png';
import facebookIcon from './assets/facebook-icon.png';
import netmedsIcon from './assets/netmeds-icon.jpg';
import gettingStartedImage from './assets/getting-started.jpg';
import connectingWithFamilyImage from './assets/connecting-with-family.jpg';
import healthAppsImage from './assets/health-apps.jpg';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="Home">
 
      {/* Navbar  
      <header className="navbar">
        <button className="sign-in-btn">Sign In</button>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#profile">Profile</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </header>
          */}

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome To <span className="highlight">Senior Connect</span></h1>
          <p>Empowering You To Embrace Technology With Confidence</p>
        </div>
        <img src={heroImage} alt="Elderly people using a tablet" className="hero-image" />
      </section>

      {/* Main Section */}
      <section className="main-content">
        <h2>Tech Made Simple for Seniors</h2>
        <p>
          Learn essential digital skills like making video calls, using online banking, 
          and browsing the internet. Our lessons cover everyday technology in clear, 
          easy-to-follow steps, so you can stay connected and confident online.
        </p>

        {/* Get Mastered In Section */}
        <div className="get-mastered-in">
          <h3>Get Mastered In</h3>
          <div className="icons">
            <img src={whatsappIcon} alt="WhatsApp" />
            <img src={amazonIcon} alt="Amazon" />
            <img src={facebookIcon} alt="Facebook" />
            <img src={netmedsIcon} alt="Netmeds" />
          </div>
        </div>

        {/* Tutorials Section */}
        <blockquote>
          "Welcome to Senior Connect! Here, you can learn to use phones, apps, and other technology 
          with simple, clear steps. We make it easy and fun, helping you stay connected and confident 
          in the digital world."
        </blockquote>

        <button className="view-tutorials-btn">View All Tutorials →</button>
 

        {/* Tutorial Cards */}
        <div className="tutorial-cards">
          <div className="card">
            <img src={gettingStartedImage} alt="Getting Started" />
            <h4>Getting Started</h4>
            <p>Basics of using a smartphone or computer</p>
            <Link to="/getting-started">Learn More</Link>
          </div>
          <div className="card">
            <img src={connectingWithFamilyImage} alt="Connecting with Family" />
            <h4>Connecting with Family</h4>
            <p>Learn to use messaging and video call apps</p>
            <Link to="/connecting-with-family">Learn More</Link>
          </div>
          <div className="card">
            <img src={healthAppsImage} alt="Health & Wellness Apps" />
            <h4>Health & Wellness Apps</h4>
            <p>Managing health with technology</p>
            <Link to="/health-wellness-apps">Learn More</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <h3>Team Senior Connect</h3>
          <p>Contact: supportseniorconnect@gmail.com</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
