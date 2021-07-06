const bcrypt = require('bcryptjs');

class UsuarioRepository {
  usuarios = [];

  cadastrar({ nome, email, tipo, senha }) {
    const existeUsuario = this.usuarios.find(usuario => usuario.email === email);

    if (existeUsuario) {
      throw new Error('Usuário já cadastrado');
    }

    const hash = bcrypt.hashSync(senha, bcrypt.genSaltSync(10));

    this.usuarios.push({ nome, email, tipo, senha: hash });

    return { nome, email, tipo, senha: hash };
  }

  logar({ email, senha }) {
    const existeUsuario = this.usuarios.find(usuario => usuario.email === email);

    if (!existeUsuario) {
      throw new Error('Usuário não cadastrado');
    }

    if (!bcrypt.compareSync(senha, existeUsuario.senha)) {
      throw new Error('Senha inválida');
    }

    return `Bem vindo ${existeUsuario.nome}`;
  }
}

module.exports = { UsuarioRepository };