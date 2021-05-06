const Cuota = require('../../models/cuota')
const _ = require('underscore')

const getCuotasDB = () => {
  return new Promise((resolve, reject) => {
    Cuota.find({}).exec((err, cuotasDB) => {
      if (err) {
        reject(err)
      }
      if (cuotasDB.length != 0) {
        resolve(cuotasDB)
      }
      resolve(null)
    })
  })
}

const getCuotaDB = (id) => {
  return new Promise((resolve, reject) => {
    Cuota.findById(id, (err, cuota) => {
      if (err) {
        reject(err)
      }
      resolve(cuota)
    })
  })
}

const postOrdenDB = (body) => {
  return new Promise((resolve, reject) => {
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
  getCuotasDB,
  getCuotaDB,
  postOrdenDB,
  /*   putAfiliadoDB, */
}
