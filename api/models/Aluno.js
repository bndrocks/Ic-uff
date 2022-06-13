const mongoose =  require('../database/index.js');
const Schema = mongoose.Mongoose.Schema;
const User = require("./User.js");
const escola = require("./Escola.js");

const alunoSchema = new Schema({
    escola:  {
        type: Schema.Types.ObjectId,
        ref: "escola"
    },
    turma: Number,
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { collection: 'alunos' }
);

const alunoModel = mongoose.Mongoose.model('aluno', alunoSchema);
module.exports = {
    alunoSchema,
    alunoModel
}