const { Router } = require('express');

const professorModel = require("../models/Professor.js");
const arquivo = require("../models/Arquivo.js");

const professorRoutes = Router();

professorRoutes.get('/:id', async (request, response)=>{
  const res = await professorModel.find({usuario: request.params.id}).populate('escolas.escola').populate('arquivos');
  return response.status(200).json(res[0]);
})

professorRoutes.delete('/:id', async (request, response)=>{
  await arquivo.deleteOne({ _id: request.params.id });
  return response.status(200).json('Arquivo deletado com sucesso');
})

professorRoutes.patch('/:id', async (request, response)=>{
  const { tema, url } = request.body;
  await arquivo.updateOne({_id: request.params.id}, {tema: tema, url: url});
  return response.status(200).json('Arquivo atualizado com sucesso');
})

//cria novo arquivo
professorRoutes.post('/', async (request, response)=>{
  const { tema, url, professor } = request.body;
  let docArquivo = await new arquivo({ tema, url, professor  });
  docArquivo.save();
  const  novoArquivo = docArquivo;
  console.log(novoArquivo)
  await professorModel.updateOne({usuario: professor}, { $push: { arquivos: novoArquivo._id }});
  return response.status(200).json('Arquivo criado com sucesso');
})

module.exports = { professorRoutes };