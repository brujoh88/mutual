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

const getAfiliadoDB = (legajo) => {
  return new Promise((resolve, reject) => {
    Afiliado.findById(legajo, (err, user) => {
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

const putAfiliadoDB = (legajo, datos) => {
  return new Promise((resolve, reject) => {
    let body = _.pick(datos, [
      'nombre',
      'apellido',
      'dni',
      'legajo',
      'saldoAsignado',
      'estado',
    ])
    Afiliado.findOneAndUpdate(
      { legajo: legajo },
      body,
      { new: true },
      (err, doc) => {
        if (err) {
          reject(err)
        }
        resolve(doc)
      }
    )
  })
}
module.exports = {
  getAfiliadosDB,
  getAfiliadoDB,
  postAfiliadoDB,
  putAfiliadoDB,
}
