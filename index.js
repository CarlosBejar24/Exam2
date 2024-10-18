const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

// Middleware para servir archivos estáticos desde la carpeta "public"
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Sirve archivos estáticos

// Ruta para servir el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Obtener información de un personaje por ID de ThronesAPI
app.get('/infoGOT/:id', async (req, res) => {
    const characterId = req.params.id;
    try {
        const response = await axios.get(`https://thronesapi.com/api/v2/Characters/${characterId}`);
        const character = response.data;
        res.json(character);
    } catch (error) {
        res.status(500).json({ error: "Error fetching character from ThronesAPI" });
    }
});

// Buscar personaje por nombre en An API of Ice and Fire
app.get('/infoGOT/search', async (req, res) => {
    const name = req.query.name;
    try {
        const response = await axios.get(`https://anapioficeandfire.com/api/characters?name=${encodeURIComponent(name)}`);
        const character = response.data[0]; // Obtener el primer resultado
        if (character) {
            res.json(character);
        } else {
            res.status(404).json({ error: "Character not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error fetching character from Ice and Fire API" });
    }
});

// Puerto donde escucha el servidor
app.listen(4000, () => {
    console.log("Listening on port 4000");
});
