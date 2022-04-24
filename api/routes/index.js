const { Router } = require('express');

const { usersRoutes } = require('./usuarios.routes');
const { scoresRoutes } = require("./pontuacoes.routes");

const routes = Router();

routes.use('/usuario', usersRoutes);
routes.use('/pontuacao', scoresRoutes);

module.exports = { routes }
