const bcrypt = require('bcryptjs');

function criptografarSenha(senha, salt){
    const res = bcrypt.hash(senha, salt)
    return res
}

//primeiro parametro na função abaixo é um exemplo de senha
criptografarSenha('123456', 12).then((res) =>{
    console.log(res);
})
