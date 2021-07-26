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
  let populateAfiliado = { path: '_afiliado', select: 'apellido_nombre legajo' }
  let populateProovedor = {
    path: '_proovedor',
    select: 'nombre',
  }
  return new Promise((resolve, reject) => {
    Orden.find({ _afiliado: id })
      .populate(populateAfiliado)
      .populate(populateProovedor)
      .exec(function(err, orden) {
        if (err) {
          reject(err)
        }
        resolve(orden)
      })
  })
}

const getOrdenComprobanteDB = (id) => {
  return new Promise((resolve, reject) => {
    Orden.find({ _id: id })
      .populate('_afiliado')
      .populate('_proovedor')
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
      porcentaje: body.porcentaje,
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
  getOrdenComprobanteDB,
  postOrdenDB,
}
