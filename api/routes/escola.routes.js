const { Router } = require('express');
const Professor = require("../models/Professor.js");

const escolaRoutes = Router();

escolaRoutes.get('/:id', async (request, response) => {
  const res = await Professor.findById(request.params.id).populate('arquivos').populate('escolas');
  return response.status(200).json(res);
})

module.exports = { escolaRoutes };