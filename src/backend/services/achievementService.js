import steamAPI from "../config/steamAPI.js";

const getAchievements = async (appId) => {
    const params = {
        key: process.env.STEAM_API_KEY,
        steamid: process.env.STEAM_ID,
        appid: appId,
    };
    try {
        const data = await steamAPI('ISteamUserStats/GetPlayerAchievements/v1/', params);
        if (data.playerstats && data.playerstats.achievements) {
            const achievements = data.playerstats.achievements;

            // Returns the achievements with the count of unlocked and total achievements
            return {
                appid: appId,
                totalAchievements: achievements.length,
                unlockedAchievements: achievements.filter(a => a.achieved).length,
            };
        } else {
            // If there are no achievements, return the count as 0
            return {
                appid: appId,
                totalAchievements: 0,
                unlockedAchievements: 0,
            };
        }
    } catch (error) {
        //console.error(`Error fetching achievements for appid ${appId}:`, error.message);
        // On error, return 0 achievements
        return {
            appid: appId,
            totalAchievements: 0,
            unlockedAchievements: 0,
        };
    }
};

export default getAchievements;