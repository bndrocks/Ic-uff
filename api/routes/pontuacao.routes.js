const { Router } = require('express');
const usuario = require("../models/User.js");
const {scoreModel} = require("../models/Score.js");
const { alunoModel } = require('../models/Aluno.js');
const escolaModel = require('../models/Escola.js');

const scoreRoutes = Router();

scoreRoutes.put('/aluno', async (request, response) => {
  const { pontuacao, idAluno } = request.body;
  const collection = await scoreModel.find({aluno: idAluno});
  var res = '';
  const alunoDoc = await alunoModel.find({usuario: idAluno});
  const tamanhoCollection = collection.length
  if(tamanhoCollection > 0){
    var docScore = collection[0]
    if(docScore.pontuacao < pontuacao){//aqui salvo só o recorde
      console.log('pont')
      docScore.pontuacao = pontuacao;
      docScore.escola = alunoDoc[0].escola;
      docScore.save();
    }
    res = docScore;
  }
  if(tamanhoCollection < 3){
    console.log(tamanhoCollection)
    res = novaPontuacao({pontuacao: pontuacao, escola: alunoDoc[0].escola, aluno: idAluno })
  }
  else{
    //esta salvando mais de 10 pontuacoes
    console.log('antes',collection.length)
    collection.splice(2,1)
    console.log('splice',collection.length)
    res = await novaPontuacao({pontuacao: pontuacao, escola: alunoDoc[0].escola, aluno: idAluno })
    console.log('depoius',collection.length)
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
          _id: "$escola",
          score: { $avg: "$pontuacao"}
        }
      },
      {
        $addFields: {
          score: { $round: ["$score"] }
        }
      }
    ])
    await escolaModel.populate(score, {path: "_id"})
  }
  else
    var score = await scoreModel.find(id ? {escola: docAluno.escola} : {}).populate('aluno', 'nome');
  return response.status(200).json(score);
})

module.exports = { scoreRoutes };