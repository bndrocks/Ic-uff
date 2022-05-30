const mongoose =  require('../database/index.js');
//const db = require('../database/index.js');
const Schema = mongoose.Mongoose.Schema;
const User = require("./User.js");
const Escola = require("./Escola.js")
const Score = require("./Score.js");
const Turma = require("./Turma.js");

const turmaSchema = new Schema({
    numero: Number,
}, { collection: 'turmas' }
);
 
module.exports =  mongoose.Mongoose.model('turma', turmaSchema);