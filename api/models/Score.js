const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./User.js");
const Escola = require("./Escola.js");

const scoreSchema = new Schema({
    pontuacao: Number,
    escola: {
        type: Schema.Types.ObjectId,
        ref: "Escola"
    },
    aluno: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, 
{ timestamps: { createdAt: 'data_criacao', updatedAt: 'data_atualizacao' }}, 
{ collection: 'scores' }
);

const scoreModel =  mongoose.model('score', scoreSchema);
module.exports = {
    scoreSchema,
    scoreModel
}