const store = require('./store')

const getAfiliadosAutoCuota = () => {
  return new Promise((resolve, reject) => {
    store
      .getAfiliadosAutoCuotaDB()
      .then((users) => resolve(users))
      .catch((err) => reject(err))
  })
}

const getAfiliados = () => {
  return new Promise((resolve, reject) => {
    store
      .getAfiliadosDB()
      .then((users) => resolve(users))
      .catch((err) => reject(err))
  })
}

const getAfiliado = (id) => {
  return new Promise((resolve, reject) => {
    store
      .getAfiliadoDB(id)
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

const putAfiliado = (id, datos) => {
  return new Promise((resolve, reject) => {
    store
      .putAfiliadoDB(id, datos)
      .then((resp) => resolve(resp))
      .catch((err) => reject(err))
  })
}
module.exports = {
  getAfiliadosAutoCuota,
  getAfiliados,
  getAfiliado,
  postAfiliado,
  putAfiliado,
}
