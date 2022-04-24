const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./User.js");

const scoreSchema = new Schema({
    pontuacao: String,
    jogo: String,
    //materia: String,
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { collection: 'scores' }
);

module.exports =  mongoose.model('Score', scoreSchema);