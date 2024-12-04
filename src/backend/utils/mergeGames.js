const mergeGames = (steamGames, otherGames) => {
    const allGames = [...steamGames, ...otherGames];

    return {
        totalGames: allGames.length,
        mostPlayed: allGames
            .sort((a, b) => b.playtime_forever - a.playtime_forever)
            .slice(0, 3), // Top 3 juegos más jugados
    };
};

export default mergeGames;
