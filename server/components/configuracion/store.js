const Configuracion = require('../../models/configuracion')
const _ = require('underscore')

const getConfigDB = () => {
  return new Promise((resolve, reject) => {
    Configuracion.find({}).exec((err, configDB) => {
      if (err) {
        reject(err)
      }
      if (configDB.length != 0) {
        resolve(configDB)
      }
      resolve(null)
    })
  })
}

const postConfigDB = (body) => {
  return new Promise((resolve, reject) => {
    let config = new Configuracion({
      cuota: body.cuota,
    })
    config.save((err, newConfigDB) => {
      if (err) {
        reject(err)
      }
      resolve(newConfigDB)
    })
  })
}

const putConfigDB = (id, datos) => {
  return new Promise((resolve, reject) => {
    let body = _.pick(datos, ['cuota'])
    Configuracion.findByIdAndUpdate(
      id,
      body,
      { new: true },
      (err, configDB) => {
        if (err) {
          reject(err)
        }
        resolve(configDB)
      }
    )
  })
}

module.exports = {
  getConfigDB,
  postConfigDB,
  putConfigDB,
}
