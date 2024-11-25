import React, { useState } from "react";
import ReactPlayer from "react-player";
import "./MusicPlayer.css"

const MusicPlayer = () => {
    return (
        <div className="music-player-container">
            <ReactPlayer
                url="https://www.youtube.com/playlist?list=PLh3ThzVLf2OxEX3-hOMw7eCUWQ8dxvPZl" // Playlist URL
                controls={true} // Show playback controls
                playing={false} 
                width="100%" 
                height="100px"
                className="react-player"
            />
        </div>
      
    );
  };
  
  export default MusicPlayer;