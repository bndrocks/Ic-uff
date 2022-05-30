const { Router } = require('express');
// Model Usuário
const usuario = require("../models/User.js");
// Model Pontuação
const score = require("../models/Score.js");

const alunoRoutes = Router();

alunoRoutes.post('/usuario', (request, response) => {
  const { pontuacao, jogo, usuario_id } = request.body;
  var novaPontuacao = new score({ pontuacao, jogo, usuario_id });
  novaPontuacao.save();
  return response.status(201).json({ pontuacao, jogo, usuario_id });
});

module.exports = { alunoRoutes };