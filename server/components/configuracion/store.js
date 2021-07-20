const Configuracion = require('../../models/configuracion')
const ConfCodigo1 = require('../../models/codigo1')
const ConfCodigo2 = require('../../models/codigo2')
const _ = require('underscore')

const getConfigDB = () => {
  return new Promise((resolve, reject) => {
    Configuracion.find({})
      .populate('_codigo1')
      .populate('_codigo2')
      .exec((err, configDB) => {
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
    let configCod1 = new ConfCodigo1({
      codigo1: body.codigo1,
    })
    configCod1.save((err, newCod1DB) => {
      if (err) {
        reject(err)
      }
      let configCod2 = new ConfCodigo2({
        codigo2: body.codigo2,
      })
      configCod2.save((err, newCod2DB) => {
        if (err) {
          reject(err)
        }
        let config = new Configuracion({
          cuota: body.cuota,
          _codigo1: newCod1DB._id,
          _codigo2: newCod2DB._id,
        })
        config.save((err, newConfigDB) => {
          if (err) {
            reject(err)
          }
          resolve(newConfigDB)
        })
      })
    })
  })
}

const putConfigDB = (id, datos) => {
  return new Promise((resolve, reject) => {
    let body = _.pick(datos, [
      'cuota',
      'codigo1',
      'codigo2',
      'idCod1',
      'idCod2',
    ])
    ConfCodigo1.findByIdAndUpdate(
      body.idCod1,
      body,
      { new: true },
      (err, cod1DB) => {
        if (err) {
          reject(err)
        }

        ConfCodigo2.findByIdAndUpdate(
          body.idCod2,
          body,
          { new: true },
          (err, cod2DB) => {
            if (err) {
              reject(err)
            }

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
          }
        )
      }
    )
  })
}

module.exports = {
  getConfigDB,
  postConfigDB,
  putConfigDB,
}
