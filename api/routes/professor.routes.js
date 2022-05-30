const { Router } = require('express');

const professor = require("../models/Professor.js");

const professorRoutes = Router();

professorRoutes.get('/:id', async (request, response)=>{
  const res = await professor.find({usuario: request.params.id}).populate('escolas.escola').populate('arquivos');
  console.log(res)
  return response.status(200).json(res[0]);
})

module.exports = { professorRoutes };