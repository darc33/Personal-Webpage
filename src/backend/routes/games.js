import express from 'express';
import { getGames } from '../controllers/gamesController.js';
const router = express.Router();

router.get('/', getGames);

export default router;

/*import steamAPI from '../config/steamAPI.js';

const router = express.Router();

router.get('/raw', async (req, res) => {
    const params = {
        key: process.env.STEAM_API_KEY,
        steamid: process.env.STEAM_ID,
        include_appinfo: true,
        format: 'json',
    };

    console.log('Steam API Key:', params.key);
    console.log('Steam User ID:', params.steamid);

    try {
        const data = await steamAPI('IPlayerService/GetOwnedGames/v1/', params);
        res.status(200).json(data.response.games); // Devuelve la lista directamente
    } catch (error) {
        console.error('Error status:', error.response?.status);
        console.error('Error details:', error.response?.data || error.message);
        res.status(500).json({ 
            error: 'Error fetching raw data', 
            status: error.response?.status,
            details: error.response?.data || error.message 
        });
    }
});*/




