const { Schema, model } = require('mongoose')

const Users = new Schema({
    email: String,
    firstname: String,
	lastname: String,
	sended: Boolean,
    birthdate: String
});

module.exports = model('Users', Users);