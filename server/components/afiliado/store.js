const Afiliado = require('../../models/afiliado')
const _ = require('underscore')

const getAfiliadosAutoCuotaDB = () => {
  return new Promise((resolve, reject) => {
    Afiliado.find({ autoCuota: true }).exec((err, afiliadosDB) => {
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
      apellido_nombre: body.apellido_nombre,
      dni: body.dni,
      legajo: body.legajo,
      codigo: body.codigo,
      saldoAsignado: body.saldoAsignado,
      autoCuota: body.autoCuota,
      detalle: body.detalle,
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
      'apellido_nombre',
      'dni',
      'legajo',
      'codigo',
      'saldoAsignado',
      'autoCuota',
      'detalle',
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
  getAfiliadosAutoCuotaDB,
  getAfiliadosDB,
  getAfiliadoDB,
  postAfiliadoDB,
  putAfiliadoDB,
}
