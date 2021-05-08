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
  let populate = { path: '_afiliado', select: 'nombre apellido legajo' }
  return new Promise((resolve, reject) => {
    Orden.find({ _afiliado: id })
      .populate(populate)
      .exec(function(err, orden) {
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
      _afiliado: body._afiliado,
      _proovedor: body._proovedor,
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
