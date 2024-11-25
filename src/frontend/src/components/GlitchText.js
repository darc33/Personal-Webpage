import React, { useState, useEffect } from "react";
import "./GlitchText.css";

const GlitchText = ({ text }) => {
  const [glitchText, setGlitchText] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
        const splitText = text.split("").map((char, i) => ({
          char,
          topOffsetX: Math.random() * 5 - 2.5, // Random horizontal movement for the top
          topOffsetY: Math.random() * 3 - 1.5, // Random vertical movement for the top
          bottomOffsetX: Math.random() * 5 - 2.5, // Random horizontal movement for the bottom
          bottomOffsetY: Math.random() * 3 - 1.5, // Random horizontal movement for the bottom
          //topColor: colors[Math.floor(Math.random()*colors.length)],//`rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`, // Color for the top
          //bottomColor: colors[Math.floor(Math.random()*colors.length)], // Color for the bottom
          key: i, // Unique identifier
        }));
        setGlitchText(splitText);
      }, 100); // Adjust the speed of change here
      return () => clearInterval(interval);
    }, [text]);

    return (
        <div className="glitch-container">
          {glitchText.map(
            (
              { char, topOffsetX, topOffsetY, bottomOffsetX, bottomOffsetY, key }
            ) => (
                <span key={key} className="glitch-char">
                {/* Parte superior del texto principal */}
                <span 
                    className="char-main char-top"
                    style={{
                        transform: `translate(${topOffsetX}px, ${topOffsetY}px)`,
                      }}>{char}</span>
                {/* Parte inferior del texto principal */}
                <span 
                    className="char-main char-bottom"
                    style={{
                        transform: `translate(${topOffsetX}px, ${topOffsetY}px)`,
                      }}>{char}</span>
    
                {/* Sombras con colores */}
                <span
                  className="char-shadow char-top magenta"
                  style={{
                    transform: `translate(${topOffsetX+1}px, ${topOffsetY+1}px)`,
                  }}
                >
                  {char}
                </span>
                <span
                  className="char-shadow char-bottom magenta"
                  style={{
                    transform: `translate(${bottomOffsetX+1}px, ${bottomOffsetY+1}px)`,
                  }}
                >
                  {char}
                </span>
    
                <span
                  className="char-shadow char-top neon-pink"
                  style={{
                    transform: `translate(${topOffsetX+2}px, ${topOffsetY+2}px)`,
                  }}
                >
                  {char}
                </span>
                <span
                  className="char-shadow char-bottom neon-pink"
                  style={{
                    transform: `translate(${bottomOffsetX+2}px, ${bottomOffsetY+2}px)`,
                  }}
                >
                  {char}
                </span>
    
                <span
                  className="char-shadow char-top yellow"
                  style={{
                    transform: `translate(${topOffsetX}px, ${topOffsetY}px)`,
                  }}
                >
                  {char}
                </span>
                <span
                  className="char-shadow char-bottom yellow"
                  style={{
                    transform: `translate(${bottomOffsetX}px, ${bottomOffsetY}px)`,
                  }}
                >
                  {char}
                </span>
              </span>
            )
          )}
          
        </div>
      );
    };

export default GlitchText;
