const store = require('./store')

const getCuotas = () => {
  return new Promise((resolve, reject) => {
    store
      .getCuotasDB()
      .then((cuotas) => resolve(cuotas))
      .catch((err) => reject(err))
  })
}

const getCuota = (id) => {
  return new Promise((resolve, reject) => {
    store
      .getCuotaDB(id)
      .then((cuota) => resolve(cuota))
      .catch((err) => reject(err))
  })
}

const postOrden = (body) => {
  return new Promise((resolve, reject) => {
    store
      .postOrdenDB(body)
      .then((resp) => resolve(resp))
      .catch((err) => reject(err))
  })
}

/*const putAfiliado = (id, datos) => {
  return new Promise((resolve, reject) => {
    store
      .putAfiliadoDB(id, datos)
      .then((resp) => resolve(resp))
      .catch((err) => reject(err))
  })
} */
module.exports = {
  getCuotas,
  getCuota,
  postOrden,
  /*   putAfiliado, */
}
