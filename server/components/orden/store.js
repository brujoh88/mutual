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

const getOrdenDB = (id) => {
  return new Promise((resolve, reject) => {
    Orden.find({ _idAfiliado: id }, (err, orden) => {
      if (err) {
        reject(err)
      }
      resolve(orden)
    })
  })
}

const postOrdenDB = (body) => {
  return new Promise((resolve, reject) => {
    let orden = new Orden({
      _idAfiliado: body._idAfiliado,
      _idProovedor: body._idProovedor,
      montoTotal: body.montoTotal,
      cantidadCuota: body.cantidadCuota,
    })
    orden.save((err, newOrdenDB) => {
      if (err) {
        reject(err)
      }
      resolve(newOrdenDB)
    })
  })
}

module.exports = {
  getOrdenesDB,
  getOrdenDB,
  postOrdenDB,
}
