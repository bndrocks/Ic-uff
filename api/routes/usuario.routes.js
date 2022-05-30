const { Router } = require('express');
const bcrypt = require('bcryptjs');
// Model Usuário
const usuario = require("../models/User.js");
const aluno = require("../models/Aluno.js");
const professor = require("../models/Professor.js");
const { ObjectId } = require('mongodb');
const userRoutes = Router();

/*usersRoutes.post('/cadastro', (request, response) => {
  const { nome, email, tipo, senha } = request.body;
  const hash = bcrypt.hashSync(senha, bcrypt.genSaltSync(10));
  var cadastro = new usuario({ nome, email, tipo, senha: hash });
  cadastro.save();
  if(tipo == 'aluno'){
    
  }
  return response.status(201).json({ nome, email, tipo });
});*/

userRoutes.post('/login', (request, response) => {
  const { email, senha } = request.body;
  //retornar dados aluno ou professor
  usuario.find({'email': email}).then(usuario => {
    let res = {};
    if(usuario.length > 0){
      (bcrypt.compareSync(senha, usuario[0].senha)) ?

        /*if( usuario[0].tipo == "professor"){
          usuario[0].professor = buscaProfessor(usuario[0]._id)
        }
        else if(usuario[0].tipo == "aluno"){
          usuario[0].aluno = buscaAluno(usuario[0]._id)
        }*/

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

function buscaProfessor(id){
  professor.find({usuario : ObjectId(id)}).then((professor) => {
    return professor
  })
}

function buscaAluno(id){
  aluno.find({usuario : ObjectId(id)}).then((aluno) => {
    return aluno
  })
}

module.exports = { userRoutes };