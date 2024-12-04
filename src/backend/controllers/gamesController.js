import { fetchSteamGames, mergeGamesData } from "../services/gamesServices.js";

export const getGames = async (req, res, next) => {
    try {
        const steamGames = await fetchSteamGames();
        //const allGames = await mergeGamesData(steamGames);

        res.status(200).json(steamGames);//allGames);
    } catch (error) {
        next(error); // Error handling
    }
};
