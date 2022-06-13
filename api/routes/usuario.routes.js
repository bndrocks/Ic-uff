const { Router } = require('express');
const bcrypt = require('bcryptjs');
const usuario = require("../models/User.js");
const userRoutes = Router();

userRoutes.post('/login', (request, response) => {
  const { email, senha } = request.body;
  usuario.find({'email': email}).then(usuario => {
    let res = {};
    if(usuario.length > 0){
      (bcrypt.compareSync(senha, usuario[0].senha)) ?
        ((res.data = `Bem vindo ${usuario[0].nome}`, res.user = usuario[0]), response.statusMessage = "Logado")
      : (res.data = 'Senha inválida', response.statusMessage = "Falha no login");
    }
    else{
      res.data = 'Usuário não cadastrado';
      response.statusMessage = "Falha no login";
    }
  return response.status(200).json(res);
  }).catch((error) => {
    console.log(error);
  });

});

module.exports = { userRoutes };