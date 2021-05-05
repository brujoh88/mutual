const store = require('./store')

const getOrdenes = () => {
  return new Promise((resolve, reject) => {
    store
      .getOrdenesDB()
      .then((ordenes) => resolve(ordenes))
      .catch((err) => reject(err))
  })
}

/* const getAfiliado = (id) => {
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
} */
module.exports = {
  getOrdenes,
  /*   getAfiliado,
  postAfiliado,
  putAfiliado, */
}
