const store = require('./store')

const getOrdenes = () => {
  return new Promise((resolve, reject) => {
    store
      .getOrdenesDB()
      .then((ordenes) => resolve(ordenes))
      .catch((err) => reject(err))
  })
}

const getOrden = (id) => {
  return new Promise((resolve, reject) => {
    store
      .getOrdenDB(id)
      .then((orden) => resolve(orden))
      .catch((err) => reject(err))
  })
}

const getOrdenComprobante = (id) => {
  return new Promise((resolve, reject) => {
    store
      .getOrdenComprobanteDB(id)
      .then((orden) => resolve(orden))
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

module.exports = {
  getOrdenes,
  getOrden,
  getOrdenComprobante,
  postOrden,
}
