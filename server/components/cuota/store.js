const Cuota = require('../../models/cuota')
const _ = require('underscore')

const getCuotasDB = () => {
  return new Promise((resolve, reject) => {
    Cuota.find({})
      .populate('_orden', {
        cantidadCouta: 1,
        _afiliado: 1,
        _proovedor: 1,
        date: 1,
        estado: 1,
      })
      .exec((err, cuotasDB) => {
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
  let populateOrden = { path: '_orden', select: 'cantidadCuota' }
  return new Promise((resolve, reject) => {
    Cuota.find({ _orden: id })
      .populate(populateOrden)
      .exec(function(err, cuota) {
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
      _orden: body._orden,
      _afiliado: body._afiliado,
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
