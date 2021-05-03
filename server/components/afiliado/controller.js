const store = require('./store')

const getAfiliado = (legajo) => {
  return new Promise((resolve, reject) => {
    store
      .getAfiliadoDB(legajo)
      .then((user) => resolve(user))
      .catch((err) => reject(err))
  })
}
module.exports = {
  getAfiliado,
}
