const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
let Schema = mongoose.Schema

let ordenSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  montoTotal: {
    type: Number,
    required: [true, 'El monto de la orden es requerido'],
  },
  cantidadCuota: {
    type: Number,
    default: 1,
  },
  _legajo: {
    type: Number,
    required: [
      true,
      'El legajo del afiliado que solicita la orden es requerida',
    ],
  },
  _proveedor: {
    type: Schema.ObjectId,
    ref: 'proveedor',
    required: [true, 'Se requiere el proveedor destino de la orden'],
  },
  estado: {
    type: Boolean,
    default: true,
  },
})

ordenSchema.plugin(uniqueValidator, {
  message: '{PATH} debe de ser unico',
})

module.exports = mongoose.model('Orden', ordenSchema)
