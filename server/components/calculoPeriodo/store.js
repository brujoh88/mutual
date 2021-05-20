const Proovedor = require('../../models/proovedor')
const _ = require('underscore')

/* const getProovedorsDB = () => {
  return new Promise((resolve, reject) => {
    Proovedor.find({}).exec((err, proovedorsDB) => {
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
    let body = _.pick(datos, ['nombre', 'estado'])
    Proovedor.findByIdAndUpdate(id, body, { new: true }, (err, proovedorDB) => {
      if (err) {
        reject(err)
      }
      resolve(proovedorDB)
    })
  })
} */

module.exports = {
  /* getProovedorsDB,
  getProovedorDB,
  postProovedorDB,
  putProovedorDB, */
}
