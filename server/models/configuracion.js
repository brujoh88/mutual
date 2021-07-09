const mongoose = require('mongoose')
let Schema = mongoose.Schema

let configSchema = new Schema({
  cuota: {
    type: Number,
    required: [true, 'El valor de la cuota es requerida'],
  },
  codigo1: {
    type: Number,
    required: [true, 'El codigo 1 es requerido'],
  },
  codigo2: {
    type: Number,
    required: [true, 'El codigo 2 es requerido'],
  },
})

module.exports = mongoose.model('Configuracion', configSchema)
