const mongoose = require('mongoose');
//alterar o endereço
mongoose.connect('mongodb+srv://admin:bndrocksxbox360@cluster0.h7opx.mongodb.net/UFF?retryWrites=true&w=majority');
 
const userSchema = new mongoose.Schema({
    nome: String,
    email: String,
    tipo: String,
    senha: String,
}, { collection: 'users' }
);
 
module.exports = { Mongoose: mongoose, UserSchema: userSchema }