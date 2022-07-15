const { Router } = require('express');
const usuario = require("../models/User.js");
const {scoreModel} = require("../models/Score.js");
const { alunoModel } = require('../models/Aluno.js');
const escolaModel = require('../models/Escola.js');

const scoreRoutes = Router();
//adicionar o tipo de jogo
scoreRoutes.put('/aluno', async (request, response) => {
  const { pontuacao, jogo, idAluno } = request.body;
  const collection = await scoreModel.find({
    aluno: idAluno,
    jogo: jogo
  });
  
  var res = '';
  const alunoDoc = await alunoModel.find({usuario: idAluno});
  const tamanhoCollection = collection.length
  if(tamanhoCollection > 0){
    var docScore = collection[0]
    // pra ser recorde precisa ter a mesma pontuação total e a nova pontuação alcançada ser maior que a antiga pontuação alcançada
    if((docScore.pontuacao.total == pontuacao.total) && (docScore.pontuacao.alcancada < pontuacao.alcancada)){//aqui salvo só o recorde
      docScore.pontuacao = pontuacao;
      docScore.escola = alunoDoc[0].escola;
      await docScore.save();
    }
    res = docScore;
  }
  if(tamanhoCollection < 3){
    res = await novaPontuacao({pontuacao: pontuacao, jogo: jogo, escola: alunoDoc[0].escola, aluno: idAluno })
  }
  else{
    //esta salvando mais de 10 pontuacoes
    collection.splice(2,1)
    res = await novaPontuacao({pontuacao: pontuacao, jogo: jogo, escola: alunoDoc[0].escola, aluno: idAluno })
  }
  return response.status(201).json({ res });
});

async function novaPontuacao(score){
  const docPontuacao = new scoreModel(score);
  await docPontuacao.save();
    return docPontuacao
}

scoreRoutes.get('/:id?/:filtro?', async (request, response)=>{
  var id = request.params.id;
  var docAluno = await alunoModel.findById(id);
  var filtro = request.params.filtro;
  //media das pontuacoes de cada escola
  if(filtro){
    var score = await scoreModel.aggregate([
      {
        $group: {
          "_id": {
            escola: "$escola",
            jogo: "$jogo"
          },
          score: { $avg: "$pontuacao.alcancada"}
      }
      },
    ])
    await escolaModel.populate(score, {path: "_id.escola"})
  }
  else
    var score = await scoreModel.find(id ? {escola: docAluno.escola} : {}).populate('aluno', 'nome');
  return response.status(200).json(score);
})

module.exports = { scoreRoutes };