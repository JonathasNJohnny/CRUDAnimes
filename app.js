const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();

app.use(express.json());

const animes = [
  {
    id: uuidv4(),
    name: "Dandadan",
    genre: "Shonen",
    studio: "Science SARU",
  },
];

app.get("/animes", (req, res) => {
  res.json(animes);
});

app.get("/anime/:id", (req, res) => {
  const { id } = req.params;
  const anime = animes.find((anime) => anime.id === id);

  if (!anime) {
    return res.status(404).json({ error: "Anime não encontrado" });
  }

  res.json(anime);
});

app.post("/anime", (req, res) => {
  const { name, genre, studio } = req.body;

  if (!name || !genre || !studio) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const newAnime = {
    id: uuidv4(),
    name,
    genre,
    studio,
  };

  animes.push(newAnime);
  res.status(201).json("Anime cadastrado com sucesso!");
});

app.put("/anime/:id", (req, res) => {
  const { id } = req.params;
  const { name, genre, studio } = req.body;

  if (!name || !genre || !studio) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const animeIndex = animes.findIndex((anime) => anime.id === id);

  if (animeIndex === -1) {
    return res.status(404).json({ error: "Anime não encontrado" });
  }

  animes[animeIndex] = { id, name, genre, studio };
  res.json("Anime alterado com sucesso!");
});

app.delete("/anime/:id", (req, res) => {
  const { id } = req.params;
  const animeIndex = animes.findIndex((anime) => anime.id === id);

  if (animeIndex === -1) {
    return res.status(404).json({ error: "Anime não encontrado" });
  }

  animes.splice(animeIndex, 1);
  res.status(204).send();
});

module.exports = app;
