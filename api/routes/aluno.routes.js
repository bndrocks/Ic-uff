const { Router } = require('express');
const {scoreModel} = require("../models/Score.js");
const {alunoModel} = require("../models/Aluno.js");
const professor = require("../models/Professor.js");

const alunoRoutes = Router();

alunoRoutes.post('/usuario', (request, response) => {
  const { pontuacao, usuario_id } = request.body;
  var novaPontuacao = new scoreModel({ pontuacao, usuario_id });
  novaPontuacao.save();
  return response.status(201).json({ pontuacao, usuario_id });
});

alunoRoutes.get('/:id', async (request, response)=>{
  const aluno = await alunoModel.find({usuario: request.params.id}).populate('escola');
  const escola = aluno[0].escola._id
  const turma = aluno[0].turma
  console.log(turma)
  const professors = await professor.find( { escolas : { $elemMatch: {escola : escola, turmas: { $elemMatch: {$gte: turma}}} } } );
  console.log(professors)
  return response.status(200).json(professors);
})

module.exports = { alunoRoutes };