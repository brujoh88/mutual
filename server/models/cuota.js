const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
let Schema = mongoose.Schema

let cuotaSchema = new Schema({
  _idOrden: {
    type: Schema.ObjectId,
    ref: 'orden',
    required: [true, 'La couta debe estar relacionada a una orden'],
  },
  monto: {
    type: Number,
    required: [true, 'El monto de la couta es requerido'],
  },
  periodo: {
    type: Date,
    required: [true, 'El periodo de vencimiento es requerido'],
  },
  estado: {
    type: Boolean,
    default: true,
  },
})

cuotaSchema.plugin(uniqueValidator, {
  message: '{PATH} debe de ser unico',
})

module.exports = mongoose.model('cuota', cuotaSchema)
