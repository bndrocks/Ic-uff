const { Router } = require('express');
// Model Usuário
const usuario = require("../models/User.js");
// Model Pontuação
const {scoreModel} = require("../models/Score.js");

const scoreRoutes = Router();

scoreRoutes.post('/usuario', (request, response) => {
  const { pontuacao, aluno } = request.body;
  var novaPontuacao = new score({ pontuacao, aluno });
  novaPontuacao.save();
  return response.status(201).json({ pontuacao, aluno, novaPontuacao });
});

scoreRoutes.get('/', async (request, response)=>{
  const score = await scoreModel.find().populate('aluno', 'nome');
  return response.status(200).json(score);
})

module.exports = { scoreRoutes };