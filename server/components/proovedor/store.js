const Proovedor = require('../../models/proovedor')
const _ = require('underscore')

const getProovedorOcultoDB = () => {
  return new Promise((resolve, reject) => {
    Proovedor.find({ estado: false }).exec((err, proovedorsDB) => {
      if (err) {
        reject(err)
      }
      if (proovedorsDB.length != 0) {
        resolve(proovedorsDB)
      }
      resolve(null)
    })
  })
}

const getProovedorsDB = () => {
  return new Promise((resolve, reject) => {
    Proovedor.find({ estado: true })
      .sort({ nombre: 1 })
      .exec((err, proovedorsDB) => {
        if (err) {
          reject(err)
        }
        if (proovedorsDB.length != 0) {
          resolve(proovedorsDB)
        }
        resolve(null)
      })
  })
}

const getProovedorDB = (idProovedor) => {
  return new Promise((resolve, reject) => {
    Proovedor.findById(idProovedor, (err, proovedor) => {
      if (err) {
        reject(err)
      }
      resolve(proovedor)
    })
  })
}

const postProovedorDB = (body) => {
  return new Promise((resolve, reject) => {
    let proovedor = new Proovedor({
      nombre: body.nombre,
      descripcion: body.descripcion,
      estado: body.estado,
    })
    proovedor.save((err, newProovedorDB) => {
      if (err) {
        reject(err)
      }
      resolve(newProovedorDB)
    })
  })
}

const putProovedorDB = (id, datos) => {
  return new Promise((resolve, reject) => {
    let body = _.pick(datos, ['nombre', 'descripcion', 'estado'])
    Proovedor.findByIdAndUpdate(id, body, { new: true }, (err, proovedorDB) => {
      if (err) {
        reject(err)
      }
      resolve(proovedorDB)
    })
  })
}

module.exports = {
  getProovedorOcultoDB,
  getProovedorsDB,
  getProovedorDB,
  postProovedorDB,
  putProovedorDB,
}
