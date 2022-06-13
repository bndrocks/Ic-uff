const { Router } = require('express');
const usuario = require("../models/User.js");
const {scoreModel} = require("../models/Score.js");

const scoreRoutes = Router();

scoreRoutes.put('/aluno', async (request, response) => {
  const { pontuacao, idAluno } = request.body;
  const collection = await scoreModel.find({aluno: idAluno});
  var res = '';
  if(collection[0]){
    var docScore = collection[0]
    if(docScore.pontuacao < pontuacao){//aqui salvo só o recorde
      docScore.pontuacao = pontuacao;
      docScore.save();
    }
    res = docScore;
  }
  else{
    const docPontuacao = await new scoreModel({ pontuacao, aluno });
    docPontuacao.save();
    res = docPontuacao;
  }
  return response.status(201).json({ res });
});

scoreRoutes.get('/', async (request, response)=>{
  const score = await scoreModel.find().populate('aluno', 'nome');
  return response.status(200).json(score);
})

module.exports = { scoreRoutes };