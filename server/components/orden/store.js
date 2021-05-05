const Orden = require('../../models/orden')
const _ = require('underscore')

const getOrdenesDB = () => {
  return new Promise((resolve, reject) => {
    Orden.find({}).exec((err, ordenesDB) => {
      if (err) {
        reject(err)
      }
      if (ordenesDB.length != 0) {
        resolve(ordenesDB)
      }
      resolve(null)
    })
  })
}

/* const getAfiliadoDB = (id) => {
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
} */
module.exports = {
  getOrdenesDB,
  /*   getAfiliadoDB,
  postAfiliadoDB,
  putAfiliadoDB, */
}
