const { Router } = require('express');

const { userRoutes } = require('./usuario.routes');
const { scoreRoutes } = require("./pontuacao.routes");
const { professorRoutes } = require('./professor.routes');
const { alunoRoutes } = require("./aluno.routes");
const { escolaRoutes } = require("./escola.routes");

const routes = Router();

routes.use('/usuario', userRoutes);
routes.use('/pontuacao', scoreRoutes);
routes.use('/professor', professorRoutes);
routes.use('/aluno', alunoRoutes);
routes.use('/escola', escolaRoutes);

module.exports = { routes }
