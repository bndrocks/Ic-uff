const { Router } = require('express');

const { usersRoutes } = require('./usuarios.routes');

const routes = Router();

routes.use('/usuario', usersRoutes);

module.exports = { routes }
