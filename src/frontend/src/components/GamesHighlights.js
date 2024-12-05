// src/components/SteamYearReview/SteamYearReview.js
import React from 'react';
import './GamesHighlights.css'; // Archivo CSS para los estilos

const GamesHighlights = ({ data }) => {
    return (
        <div className="review-container">
            <div className="card">
                <div className="card-info fst-card">
                    <div className="card-info-title">
                        <span className="review-title">darc's</span>
                        REVIEW
                    </div>
                    <div className="card-info-subtitle">
                        <div className='subtitle-num'>
                            {data.totalGames}
                        </div>
                        <div className='subtitle-text'>
                            Games Played
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-info snd-card">
                    <div className='info-rotated'>
                        <div className='info-rotated-num'>
                            {data.tAchievements}
                        </div>
                        <div className='info-rotated-text'>
                            Achievements Unlocked
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-info trd-card">
                    <div className='info-rotated'>
                        <div className='info-rotated-num'>
                            {Math.round(data.totalHours / 24)}
                        </div>
                        <div className='info-rotated-text'>
                            Longest Streak
                        </div>
                    </div>
                </div>
            </div>

            {/* Second Row*/}
            {data.mostPlayed.map((game, index) => (
                <div className="game-card" key={index}>
                    <div className={`card-info card-info-games card-${index + 4}th`}>
                        <div
                            className="game-icon"
                            style={{
                                backgroundImage: `url(https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg)`,
                            }}
                        />

                        <div className="game-title">{game.name}</div>
                        <div className="card-info-bottom">
                            <div className="game-hours">
                                <div className='game-hours-num'>{Math.floor(game.playtime_forever)}</div>
                                <div className='game-hours-text'> hours</div>
                            </div>
                            <div className="game-platform">{game.platform}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GamesHighlights;
