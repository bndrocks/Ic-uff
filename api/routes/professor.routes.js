const { Router } = require('express');

const professorModel = require("../models/Professor.js");
const arquivo = require("../models/Arquivo.js");
const escolaModel = require('../models/Escola.js');

const professorRoutes = Router();

professorRoutes.get('/:id', async (request, response)=>{
  const res = await professorModel.find({usuario: request.params.id}).populate('escolas.escola').populate('arquivos');
  return response.status(200).json(res[0]);
})

professorRoutes.delete('/arquivo/:id', async (request, response)=>{
  let message = '';
  let docArquivo = await arquivo.findOne({ _id: request.params.id });
  if(docArquivo){
    let idProfessor = docArquivo.professor;
    let docArquivosProfessor = await professorModel.findOne({usuario: idProfessor});
    let num = docArquivosProfessor.arquivos.findIndex((id)=>{
      return id == request.params.id;
    })
    console.log(num);
    docArquivosProfessor.arquivos.splice(num, 1);
    await docArquivosProfessor.save();
    console.log(docArquivosProfessor)
    await arquivo.deleteOne({ _id: request.params.id });
    message = 'Arquivo deletado com sucesso'
  }
  else
    message = 'Erro ao deletar arquivo'
  return response.status(200).json(message);
})

//cria novo arquivo
professorRoutes.post('/arquivo', async (request, response)=>{
  const { tema, conteudo, professor } = request.body;
  let docArquivo = await new arquivo({ tema, conteudo, professor  });
  docArquivo.save();
  const  novoArquivo = docArquivo;
  await professorModel.updateOne({usuario: professor}, { $push: { arquivos: novoArquivo._id }});
  return response.status(200).json(novoArquivo);
})
professorRoutes.patch('/arquivo/:id', async (request, response)=>{
  let dadosArquivo = {};
  dadosArquivo.tema = request.body.tema;
  if(request.body.conteudo){
    dadosArquivo.conteudo = request.body.conteudo;
  }
  await arquivo.updateOne({_id: request.params.id}, dadosArquivo);
  return response.status(200).json('Arquivo atualizado com sucesso');
})

professorRoutes.delete('/:id/:posicao', async (request, response)=>{
  const escolasProfessor = await professorModel.findOne({ usuario: request.params.id });
  escolasProfessor.escolas.splice(request.params.posicao)
  escolasProfessor.save()

  return response.status(200).json('Escola removida com sucesso');
})

professorRoutes.patch('/:id', async (request, response)=>{
  const { escola, turmas, posicao } = request.body;
  const docProfessor = buscaDadosProfessor(request.params.id)
  var docEscolas = buscaEscola(escola)

  if(docEscolas.length < 1){
    var novaEscola = await new escolaModel({nome: escola}).save();
    docProfessor.escolas[posicao].escola = novaEscola._id;
  }
  else{
    docProfessor.escolas[posicao].escola = docEscolas[0]._id;
  }
  docProfessor.escolas[posicao].turmas = turmas;
  docProfessor.save();

  return response.status(200).json('Escola e turma atualizado com sucesso');
})

professorRoutes.post('/escola', async(request, response) => {
  const { escola, turmas, idProfessor } = request.body;
  var docEscolas = await buscaEscola(escola)
  var docProfessor   = await buscaDadosProfessor(idProfessor)
  var idEscola = null;
  if(docEscolas.length < 1){
    var novaEscola = await new escolaModel({nome: escola}).save();
    idEscola =  novaEscola._id
  }
  else{
    idEscola = docEscolas[0]._id
  }
  docProfessor.escolas.push({escola: idEscola, turmas: turmas}) ;
  docProfessor.save(); 
  return response.status(200).json('Escola e turma adicionados com sucesso');
})

//busca a escola pelo nome
async function buscaEscola(escola){
  var queryEscolas = escolaModel.find({nome:  new RegExp(`^${escola}$`, 'i') })
  const docEscolas = await queryEscolas.exec();
  return docEscolas
}

async function buscaDadosProfessor(id){
  var queryProfessor = professorModel.findOne({usuario: id});
  const docProfessor = await queryProfessor.exec();
  return docProfessor
}

module.exports = { professorRoutes };