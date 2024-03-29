const Cuota = require('../../models/cuota')

const getCuotasDB = () => {
  return new Promise((resolve, reject) => {
    Cuota.find({})
      .populate('_orden', {
        cantidadCouta: 1,
        _proovedor: 1,
        date: 1,
        estado: 1,
      })
      .populate('_afiliado')
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

const getCuotasByUserDB = (id) => {
  return new Promise((resolve, reject) => {
    let dia = new Date()
    let anioActual = dia.getFullYear()
    let mesActual = dia.getMonth()

    Cuota.find({
      _afiliado: id,
      periodo: { $gte: new Date(anioActual, mesActual) },
    })
      .populate('_orden')
      .sort({ periodo: 1 })
      .exec(function(err, cuota) {
        if (err) {
          reject(err)
        }
        resolve(cuota)
      })
  })
}

const getCuotasByMesDB = (anio, mes) => {
  return new Promise((resolve, reject) => {
    Cuota.find({
      periodo: { $eq: new Date(anio, mes) },
    })
      .populate('_afiliado')
      .sort({ periodo: 1 })
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
      detalle: body.detalle,
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

const getCuotasFijasDB = (periodo, detalle) => {
  return new Promise((resolve, reject) => {
    Cuota.find({ periodo: periodo, detalle: detalle })
      .populate('_orden', {
        cantidadCouta: 1,
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

module.exports = {
  getCuotasDB,
  getCuotaDB,
  getCuotasByUserDB,
  getCuotasByMesDB,
  postCuotaDB,
  getCuotasFijasDB,
}
