const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./User.js");

const scoreSchema = new Schema({
    pontuacao: String,
    aluno: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { collection: 'scores' }
);

const scoreModel =  mongoose.model('score', scoreSchema);
module.exports = {
    scoreSchema,
    scoreModel
}