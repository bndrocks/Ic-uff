const { Router } = require('express');
// Model Usuário
const usuario = require("../models/User.js");
// Model Pontuação
const score = require("../models/Score.js");

const escolaRoutes = Router();

escolaRoutes.get('/:id', async (request, response)=>{
  const res = await professor.findById(request.params.id).populate('arquivos').populate('escolas');
  return response.status(200).json(res);
})

module.exports = { escolaRoutes };