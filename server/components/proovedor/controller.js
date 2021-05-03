const store = require('./store')

const getProovedor = (idProovedor) => {
  return new Promise((resolve, reject) => {
    store
      .getProovedorDB(idProovedor)
      .then((proovedor) => resolve(proovedor))
      .catch((err) => reject(err))
  })
}

module.exports = {
  getProovedor,
}
