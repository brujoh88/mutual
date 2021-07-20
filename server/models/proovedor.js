const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
let Schema = mongoose.Schema

let proovedordorSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
  },
  descripcion: {
    type: String,
    default: 'Sin descripcion',
  },
  estado: {
    type: Boolean,
    default: true,
  },
})

proovedordorSchema.plugin(uniqueValidator, {
  message: '{PATH} debe de ser unico',
})

module.exports = mongoose.model('Proovedor', proovedordorSchema)
