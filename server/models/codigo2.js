const mongoose = require('mongoose')
let Schema = mongoose.Schema

let codigo2Schema = new Schema({
  codigo2: {
    type: Number,
  },
})

module.exports = mongoose.model('Codigo2', codigo2Schema)
