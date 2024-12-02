import React from 'react';
import "./Home.css";
import MusicPlayer from './MusicPlayer';
import Typewriter from 'typewriter-effect';

const Home = () => {
  return (
    <div className="home-container">

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

      
    </div>

  );
}

export default Home;
