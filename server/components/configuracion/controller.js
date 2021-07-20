const store = require('./store')

const getConfig = () => {
  return new Promise((resolve, reject) => {
    store
      .getConfigDB()
      .then((proovedors) => resolve(proovedors))
      .catch((err) => reject(err))
  })
}

const postConfig = (body) => {
  return new Promise((resolve, reject) => {
    store
      .postConfigDB(body)
      .then((resp) => resolve(resp))
      .catch((err) => reject(err))
  })
}

const putConfig = (id, datos) => {
  return new Promise((resolve, reject) => {
    store
      .putConfigDB(id, datos)
      .then((resp) => resolve(resp))
      .catch((err) => reject(err))
  })
}

module.exports = {
  getConfig,
  postConfig,
  putConfig,
}
