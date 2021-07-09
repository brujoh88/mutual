const mongoose = require('mongoose')
let Schema = mongoose.Schema

let configSchema = new Schema({
  cuota: {
    type: Number,
    required: [true, 'El valor de la cuota es requerida'],
  },
})

module.exports = mongoose.model('Configuracion', configSchema)
