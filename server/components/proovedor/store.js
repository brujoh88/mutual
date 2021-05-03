const Proovedor = require('../../models/proovedor')

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

module.exports = {
  getProovedorDB,
  postProovedorDB,
}
