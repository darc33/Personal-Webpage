import getAchievements from "../services/achievementService.js";
import gamesData from "../data/gamesData.json" with { type: 'json' };

const mergeGames = async (steamGames) => {

    const normalizedSteamGames = await Promise.all(
        steamGames.map(async (game) => {
            const achievements = await getAchievements(game.appid); // Llamamos a getAchievements para cada juego
            return {
                appid: game.appid,
                name: game.name || 'Unknown',
                platform: 'PC',
                genre: 'Unknown',
                playtime_forever: (game.playtime_forever/60) || 0,
                img_icon_url: game.img_icon_url || null,
                totalAchievements: achievements.totalAchievements,
                unlockedAchievements: achievements.unlockedAchievements,
            };
        })
    );

    const normalizedOtherGames = gamesData.map(game => ({
        name: game.name,
        platform: game.platform || 'Unknown',
        genre: game.genre || 'Unknown',
        playtime_forever: game.playtime_forever || 0,
        img_icon_url: null, 
        totalAchievements: null,
        unlockedAchievements: null,
    }));

    const allGames = [...normalizedSteamGames, ...normalizedOtherGames];

    return {
        totalGames: allGames.length,
        mostPlayed: allGames
            .sort((a, b) => b.playtime_forever - a.playtime_forever)
            .slice(0, 3), // Top 3 juegos más jugados
    };
};

export default mergeGames;
