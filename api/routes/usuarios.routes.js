const { Router } = require('express');

const { UsuarioRepository } = require('../repositories');

const usersRoutes = Router();

const usuarioRepository = new UsuarioRepository();

usersRoutes.post('/cadastro', (request, response) => {
  const { nome, email, tipo, senha } = request.body;

  const resultado = usuarioRepository.cadastrar({ nome, email, tipo, senha });

  return response.status(201).json({ resultado });
});

usersRoutes.post('/login', (request, response) => {
  const { email, senha } = request.body;

  const message = usuarioRepository.logar({ email, senha });

  return response.status(201).json({ message });
});

module.exports = { usersRoutes };