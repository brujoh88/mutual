const store = require('./store')

const getAfiliados = () => {
  return new Promise((resolve, reject) => {
    store
      .getAfiliadosDB()
      .then((users) => resolve(users))
      .catch((err) => reject(err))
  })
}

const getAfiliado = (legajo) => {
  return new Promise((resolve, reject) => {
    store
      .getAfiliadoDB(legajo)
      .then((user) => resolve(user))
      .catch((err) => reject(err))
  })
}

const postAfiliado = (body) => {
  return new Promise((resolve, reject) => {
    store
      .postAfiliadoDB(body)
      .then((resp) => resolve(resp))
      .catch((err) => reject(err))
  })
}

const putAfiliado = (legajo, datos) => {
  return new Promise((resolve, reject) => {
    store
      .putAfiliadoDB(legajo, datos)
      .then((resp) => resolve(resp))
      .catch((err) => reject(err))
  })
}
module.exports = {
  getAfiliados,
  getAfiliado,
  postAfiliado,
  putAfiliado,
}
