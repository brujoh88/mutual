const mongoose = require('mongoose')
let Schema = mongoose.Schema

let codigo1Schema = new Schema({
  codigo1: {
    type: Number,
  },
})

module.exports = mongoose.model('Codigo1', codigo1Schema)
