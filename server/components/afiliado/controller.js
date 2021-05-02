const store = require('./store')

const getAfiliado = (legajo) => {
  return new Promise((resolve, reject) => {
    const user = store.getAfiliadoDB(legajo)
    console.log(user)
    resolve(user)
  })
}
module.exports = {
  getAfiliado,
}
