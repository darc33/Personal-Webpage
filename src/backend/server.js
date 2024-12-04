// backend/server.js
/*const express = require('express');
const fetch = require('node-fetch');*/
import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 5000;

app.use(express.json()); //Permite parsear JSON

app.get('/', (req,res) => {
    res.send('Hello from the back-end!');
});

// Ruta para obtener los logros de Steam
app.get('/steam-achievements', async (req, res) => {
  const appId = '1599340';  // ID de Lost Ark
  const steamId = 'tu_steamid64';  // Reemplaza con tu SteamID64
  const apiKey = 'tu_api_key_aqui';  // Reemplaza con tu API Key de Steam

  try {
    const response = await fetch(`https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/?appid=${appId}&key=${apiKey}&steamid=${steamId}`);
    const data = await response.json();
    res.json(data);  // Envía los datos al frontend
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener logros de Steam' });
  }
});

app.listen(port, () => {
  console.log(`Backend escuchando en http://localhost:${port}`);
});
