const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
let Schema = mongoose.Schema

let afiliadoSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
  },
  apellido: {
    type: String,
    required: [true, 'El apellido es requerido'],
  },
  dni: {
    type: Number,
    required: [true, 'DNI es requerido'],
    unique: true,
  },
  legajo: {
    type: Number,
    required: [true, 'El legajo es requerido'],
    unique: true,
  },
  codigo: {
    type: Number,
    required: [true, 'Este codigo del afiliado es requerido'],
    enum: [640, 650],
  },
  saldoAsignado: {
    type: Number,
    required: [true, 'Se requiere asignarle un saldo'],
  },
  estado: {
    type: Boolean,
    default: true,
  },
})

afiliadoSchema.plugin(uniqueValidator, {
  message: '{PATH} debe de ser unico',
})

module.exports = mongoose.model('Afiliado', afiliadoSchema)
