const mongoose = require('mongoose')

/*
*  Localhost Database
*
*/
const db = () => mongoose.connect('mongodb://localhost/todolist')

module.exports = db
