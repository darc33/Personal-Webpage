import steamAPI from "../config/steamAPI.js";
import mergeGames from "../utils/mergeGames.js";

export const fetchSteamGames = async () => {
    const params = {
        key: process.env.STEAM_API_KEY,
        steamid: process.env.STEAM_ID,
        include_appinfo: true,
        format: 'json',
    };

    try {
        const data = await steamAPI('IPlayerService/GetOwnedGames/v1/', params);
        // Filter out unwanted fields
        if (data.response && data.response.games) {
            // Filtrar los campos no deseados
            const cleanedGames = data.response.games.map((game) => {
                const { playtime_windows_forever, playtime_mac_forever, playtime_linux_forever, playtime_deck_forever, rtime_last_played, playtime_disconnected, has_community_visible_stats, has_leaderboards, content_descriptorids, ...filteredGame } = game;
                return filteredGame;
            });
            return cleanedGames;
        } else {
            throw new Error('No games found in the response');
        }
        //return data.response.games;
    } catch (error) {
        console.error('Error fetching Steam games:', error);
        throw new Error('Failed to fetch Steam games');
    }
};

export const mergeGamesData = async (steamGames) => {
    return await mergeGames(steamGames);
};