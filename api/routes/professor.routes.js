const { Router } = require('express');

const professor = require("../models/Professor.js");
const arquivo = require("../models/Arquivo.js");

const professorRoutes = Router();

professorRoutes.get('/:id', async (request, response)=>{
  const res = await professor.find({usuario: request.params.id}).populate('escolas.escola').populate('arquivos');
  console.log(res[0])
  return response.status(200).json(res[0]);
})

professorRoutes.delete('/:id', async (request, response)=>{
  await arquivo.deleteOne({ _id: request.params.id });
  return response.status(200).json('Arquivo deletado com sucesso');
})

professorRoutes.patch('/:id', async (request, response)=>{
  const { tema, url } = request.body;
  const res = await arquivo.updateOne({_id: request.params.id}, {tema: tema, url: url});
  console.log(res)
  return response.status(200).json('Arquivo atualizado com sucesso');
})

module.exports = { professorRoutes };