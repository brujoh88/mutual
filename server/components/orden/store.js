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
    Orden.findById(id, (err, orden) => {
      if (err) {
        reject(err)
      }
      resolve(orden)
    })
  })
}

const postOrdenDB = (body) => {
  return new Promise((resolve, reject) => {
    console.log(body._idProveedor)
    let orden = new Orden({
      _idAfiliado: body._idAfiliado,
      _idProovedor: body._idProovedor,
      montoTotal: body.montoTotal,
      cantidadCouta: body.cantidadCouta,
    })
    orden.save((err, newOrdenDB) => {
      if (err) {
        reject(err)
      }
      resolve(newOrdenDB)
    })
  })
}

/*const putAfiliadoDB = (id, datos) => {
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
  getOrdenDB,
  postOrdenDB,
  /*   putAfiliadoDB, */
}
