const { Router } = require('express');
// Model Usuário
const usuario = require("../models/User.js");
// Model Pontuação
const score = require("../models/Score.js");

const scoresRoutes = Router();

scoresRoutes.post('/usuario', (request, response) => {
  const { pontuacao, jogo, usuario_id } = request.body;
  var novaPontuacao = new score({ pontuacao, jogo, usuario_id });
  novaPontuacao.save();
  return response.status(201).json({ pontuacao, jogo, usuario_id });
});

/*scoresRoutes.post('/login', (request, response) => {
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

});*/

module.exports = { scoresRoutes };