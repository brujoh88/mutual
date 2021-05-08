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
    Cuota.find({ _idOrden: id }, (err, cuota) => {
      if (err) {
        reject(err)
      }
      resolve(cuota)
    })
  })
}

const postCuotaDB = (body) => {
  return new Promise((resolve, reject) => {
    let cuota = new Cuota({
      _idOrden: body._idOrden,
      monto: body.monto,
      periodo: body.periodo,
    })
    cuota.save((err, newCuotaDB) => {
      if (err) {
        reject(err)
      }
      resolve(newCuotaDB)
    })
  })
}

module.exports = {
  getCuotasDB,
  getCuotaDB,
  postCuotaDB,
}
