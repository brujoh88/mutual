const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
let Schema = mongoose.Schema

let cuotaSchema = new Schema({
  _orden: {
    type: Number,
    ref: 'Orden',
    required: [true, 'La couta debe estar relacionada a una orden'],
  },
  _afiliado: {
    type: Schema.ObjectId,
    ref: 'Afiliado',
    required: [true, 'El id del afiliado que solicita la orden es requerida'],
  },
  monto: {
    type: Number,
    required: [true, 'El monto de la couta es requerido'],
  },
  periodo: {
    type: Date,
    required: [true, 'El periodo de vencimiento es requerido'],
  },
  detalle: {
    type: String,
    required: [true, 'El detalle de la cuota es requerido'],
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
