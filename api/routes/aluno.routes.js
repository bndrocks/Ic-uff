const { Router } = require('express');
const {scoreModel} = require("../models/Score.js");
const {alunoModel} = require("../models/Aluno.js");
const professorModel = require("../models/Professor.js");
const escolaModel = require('../models/Escola.js');

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
  const query = professorModel.find( { escolas : { $elemMatch: {escola : escola, turmas : turma} } } ).populate('arquivos');
  const docsArquivos = await query.exec();
  const resArquivos ={ aluno: aluno, arquivos: docsArquivos.length > 0 ? docsArquivos[0].arquivos : ''}
  return response.status(200).json(resArquivos);
})

alunoRoutes.patch('/:id', async (request, response)=>{
  const { escola, turma } = request.body;
  var queryAluno = alunoModel.findOne({usuario: request.params.id});
  var queryEscolas = escolaModel.find({nome:  new RegExp(`^${escola}$`, 'i') })
  const docEscolas = await queryEscolas.exec();
  const docAluno = await queryAluno.exec();
  if(docEscolas.length < 1){
    var novaEscola = await new escolaModel({nome: escola}).save();
    docAluno.escola = novaEscola._id;
  }
  else{
    docAluno.escola = docEscolas[0]._id;
  }
  docAluno.turma = turma;
  docAluno.save(); 
  console.log(docAluno)
  //await alunoModel.updateOne({usuario: request.params.id}, {escola: idEscola, turma: turma});
  return response.status(200).json('Arquivo atualizado com sucesso');
})


module.exports = { alunoRoutes };