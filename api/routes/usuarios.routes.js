const { Router } = require('express');
const bcrypt = require('bcryptjs');
const db = require("../database/index.js");
const usuario = db.Mongoose.model('users', db.UserSchema, 'users');

const usersRoutes = Router();

usersRoutes.post('/cadastro', (request, response) => {
  const { nome, email, tipo, senha } = request.body;
  const hash = bcrypt.hashSync(senha, bcrypt.genSaltSync(10));
  var cadastro = new usuario({ nome, email, tipo, senha: hash });
  cadastro.save();
  return response.status(201).json({ nome, email, tipo });
});

usersRoutes.post('/login', (request, response) => {
  const { email, senha } = request.body;
  usuario.find({'email': email}).then(usuario => {
    let res = {};
    if(usuario.length > 0){
      console.log(senha, usuario[0].senha, bcrypt.compareSync(senha, usuario[0].senha));
      (bcrypt.compareSync(senha, usuario[0].senha)) ? ((res.data = `Bem vindo ${usuario[0].nome}`, res.user = usuario[0]), response.statusMessage = "Logado") : (res.data = 'Senha inválida', response.statusMessage = "Falha no login");
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

module.exports = { usersRoutes };