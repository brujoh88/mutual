const mongoose = require('mongoose')
let Schema = mongoose.Schema

let configSchema = new Schema({
  cuota: {
    type: Number,
    required: [true, 'El valor de la cuota es requerida'],
  },
  _codigo1: {
    type: Schema.ObjectId,
    ref: 'Codigo1',
    required: [true, 'El codigo 1 es requerido'],
  },
  _codigo2: {
    type: Schema.ObjectId,
    ref: 'Codigo2',
    required: [true, 'El codigo 2 es requerido'],
  },
})

module.exports = mongoose.model('Configuracion', configSchema)
