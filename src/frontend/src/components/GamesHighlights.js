// src/components/SteamYearReview/SteamYearReview.js
import React from 'react';
import './GamesHighlights.css'; // Archivo CSS para los estilos

const GamesHighlights = ({ data }) => {
    return (
        <div className="review-container">
            <div className="card">
                <h3>Games Played</h3>
                <p>{data.totalGames}</p>
            </div>
            <div className="card">
                <h3>Achievements Unlocked</h3>
                <p>{data.achievementsUnlocked}</p>
            </div>
            <div className="card">
                <h3>Longest Streak</h3>
                <p>{data.longestStreak}</p>
            </div>

            <div className="game-cards">
                {data.mostPlayed.map((game, index) => (
                    <div className="game-card" key={index}>
                        <img
                            src={`https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
                            alt={game.name}
                            className="game-icon"
                        />
                        <div className="game-info">
                            <h4>{game.name}</h4>
                            <p>{game.playtime_forever} hours</p>
                            <p>{game.platform}</p>
                            <p>{game.genre}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GamesHighlights;
