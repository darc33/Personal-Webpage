import React from 'react';
import "./Home.css";
import PortfolioSlider from './PortfolioSlider';
import MusicPlayer from './MusicPlayer';
import Sidebar from './Sidebar';
import Header from './Header';
import Typewriter from 'typewriter-effect';

const Home = () => {
  return (
    <div className="home-container">

      <Header />

      <section className="home-sidebar">
        <Sidebar />
      </section>

      <section className="home-phrase">
        <div className="home-phrase-container">
          <h1 className="home-phrase-content">
            <Typewriter 
              options={{ 
                strings: [
                  "Like water, \n   intelligence flows and adapts, \n           seeking growth every day."
                ],
                autoStart:true,
                loop: true,
                delay: 75,
                deleteSpeed: 50,
                cursor: "_",
                pauseFor: 3000,
                wrapperClassName: "typewriter-text"
               }} 
               />
          </h1>
        </div>
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
