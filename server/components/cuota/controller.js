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

const postCuota = (body) => {
  return new Promise((resolve, reject) => {
    store
      .postCuotaDB(body)
      .then((resp) => resolve(resp))
      .catch((err) => reject(err))
  })
}

module.exports = {
  getCuotas,
  getCuota,
  postCuota,
}