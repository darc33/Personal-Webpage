import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';

import gamesRoutes from './routes/games.js';
import booksRoutes from './routes/books.js';
import travelsRoutes from './routes/travels.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config()
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); //Permite parsear JSON


app.get('/', (req,res) => {
    res.send('Hello from the back-end!');
});

// Ruta para obtener los logros de Steam
app.get('/steam-achievements', async (req, res) => {
  const appId = '1599340';  // ID de Lost Ark
  const steamId = process.env.STEAM_ID;
  const apiKey = process.env.STEAM_API_KEY;  

  try {
    const response = await fetch(`https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/?appid=${appId}&key=${apiKey}&steamid=${steamId}`);
    const data = await response.json();
    res.json(data);  // Envía los datos al frontend
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener logros de Steam' });
  }
});

// Rutas principales
app.use('/api/games', gamesRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/travels', travelsRoutes);
// Middleware de manejo de errores
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
