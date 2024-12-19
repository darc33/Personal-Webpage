import getAchievements from "../services/achievementService.js";
import gamesData from "../data/gamesData.json" with { type: 'json' };

const mergeGames = async (steamGames) => {

    const normalizedSteamGames = await Promise.all(
        steamGames.map(async (game) => {
            const achievements = await getAchievements(game.appid); // Call getAchievements for each game
            return {
                appid: game.appid,
                name: game.name || 'Unknown',
                platform: 'PC',
                genre: 'Unknown',
                playtime_forever: (game.playtime_forever / 60) || 0,
                img_icon_url: game.img_icon_url || null,
                totalAchievements: achievements.totalAchievements,
                unlockedAchievements: achievements.unlockedAchievements,
            };
        })
    );

    const normalizedOtherGames = gamesData.map(game => ({
        name: game.Title,
        platform: game.Platform || 'Unknown',
        genre: game.Genre || 'Unknown',
        playtime_forever: game.Playtime_forever || 0,
        img_icon_url: null,
        totalAchievements: null,
        unlockedAchievements: null,
    }));

    const allGames = [...normalizedSteamGames, ...normalizedOtherGames];
    //Remove repeated games
    const uniqueGames = allGames.reduce((acc, game) => {
        const existingGame = acc.find(existingGame => existingGame.name === game.name);

        if (!existingGame) {
            // If the game is not in the accumulator, add it as is
            acc.push(game);
        } else {
            // If the game is already in the accumulator, we only update the genre
            existingGame.genre = game.genre;
        }

        return acc;
    }, []);

    // Replace the platforms
    const updatedGames = uniqueGames.map(game => {
        const updatedPlatform = game.platform
            .split(', ')
            .map(platform =>
                platform
                    .replace('PlayStation 1', 'PS1')
                    .replace('PlayStation2', 'PS2')
                    .replace('PlayStation3', 'PS3')
            )
            .join(', ');

        return {
            ...game,
            platform: updatedPlatform
        };
    });

    //list of games
    const filteredGames = updatedGames.map(game => ({
        name: game.name,
        platform: game.platform,
        genre: game.genre,
        timePlayed: game.playtime_forever,
    }))
        .filter(game => game.timePlayed > 0);
    const tAchievements = allGames.reduce((acc, game) => acc + (game.unlockedAchievements || 0), 0);
    const totalHours = allGames.reduce((acc, game) => acc + (game.playtime_forever || 0), 0)

    return {
        totalGames: uniqueGames.length,
        mostPlayed: updatedGames
            .sort((a, b) => b.playtime_forever - a.playtime_forever)
            .slice(0, 3), // Top 3 most played games
        tAchievements: tAchievements,
        totalHours: totalHours,
        gamesList: filteredGames,
    };
};

export default mergeGames;
