const Afiliado = require('../../models/afiliado')
const _ = require('underscore')

const getAfiliadosDB = () => {
  return new Promise((resolve, reject) => {
    Afiliado.find({}).exec((err, afiliadosDB) => {
      if (err) {
        reject(err)
      }
      if (afiliadosDB.length != 0) {
        resolve(afiliadosDB)
      }
      resolve(null)
    })
  })
}

const getAfiliadoDB = (id) => {
  return new Promise((resolve, reject) => {
    Afiliado.findById(id, (err, user) => {
      if (err) {
        reject(err)
      }
      resolve(user)
    })
  })
}

const postAfiliadoDB = (body) => {
  return new Promise((resolve, reject) => {
    let afiliado = new Afiliado({
      nombre: body.nombre,
      apellido: body.apellido,
      dni: body.dni,
      legajo: body.legajo,
      codigo: body.codigo,
      saldoAsignado: body.saldoAsignado,
      estado: body.estado,
    })
    afiliado.save((err, newAfiliadoDB) => {
      if (err) {
        reject(err)
      }
      resolve(newAfiliadoDB)
    })
  })
}

const putAfiliadoDB = (id, datos) => {
  return new Promise((resolve, reject) => {
    let body = _.pick(datos, [
      'nombre',
      'apellido',
      'dni',
      'legajo',
      'codigo',
      'saldoAsignado',
      'estado',
    ])
    Afiliado.findByIdAndUpdate(id, body, { new: true }, (err, doc) => {
      if (err) {
        reject(err)
      }
      resolve(doc)
    })
  })
}
module.exports = {
  getAfiliadosDB,
  getAfiliadoDB,
  postAfiliadoDB,
  putAfiliadoDB,
}
