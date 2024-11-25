import React from 'react';
import "./Home.css";
import PortfolioSlider from './PortfolioSlider';
import MusicPlayer from './MusicPlayer';
import GlitchText from './GlitchText';
import Sidebar from './Sidebar';

const Home = () => {
  return (
    <div className="home-container">

      <header className="home-header">
        <div className='header-logo'>
          <img src='/logo512.png' alt="Logo"></img>
        </div>
        <div className='header-title-container'>
          <h1 className="header-title"><GlitchText text={"DARC"} /></h1>
        </div>
        
        
        <div className="header-buttons">
          <button className="btn btn-login">Log In</button>
          <button className="btn btn-register">Register</button>
        </div>        
      </header>

      <section className="home-sidebar">
        <Sidebar />
      </section>

      <section className="home-slider">
        <div className="portfolio-content">
          <PortfolioSlider />
        </div>        
      </section>

      <section className="home-content">
        <h2>Highlights</h2>
        <p>This project demonstrates:</p>
        <ul>
          <li>Front-end skills with React and CSS frameworks</li>
          <li>Responsive design and adaptive layouts</li>
          <li>Integration of animations and dynamic components</li>
        </ul>
      </section>

      <section className="music-player-section">
        <MusicPlayer />
      </section>

      <section className="home-portfolio">
        <h2>Portfolio</h2>
        <p>Check out some of my projects:</p>
        <ul>
          <li>
            <a href="https://github.com/your-github" target="_blank" rel="noreferrer">
              GitHub Projects
            </a>
          </li>
          <li>
            <a href="https://www.behance.net/your-behance" target="_blank" rel="noreferrer">
              Animation & Drawing Portfolio
            </a>
          </li>
          <li>
            <a href="https://www.credly.com/users/your-profile" target="_blank" rel="noreferrer">
              Professional Certifications
            </a>
          </li>
        </ul>
      </section>
      <footer className="home-footer">
        <p>All rights reserved © DARC {new Date().getFullYear()}  </p>
      </footer>
    </div>

  );
}

export default Home;
