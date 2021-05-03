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

module.exports = {
  getProovedorDB,
}
