const store = require('./store')

const getProovedors = () => {
  return new Promise((resolve, reject) => {
    store
      .getProovedorsDB()
      .then((proovedors) => resolve(proovedors))
      .catch((err) => reject(err))
  })
}

const getProovedor = (idProovedor) => {
  return new Promise((resolve, reject) => {
    store
      .getProovedorDB(idProovedor)
      .then((proovedor) => resolve(proovedor))
      .catch((err) => reject(err))
  })
}

const postProovedor = (body) => {
  return new Promise((resolve, reject) => {
    store
      .postProovedorDB(body)
      .then((resp) => resolve(resp))
      .catch((err) => reject(err))
  })
}

const putProovedor = (id, datos) => {
  return new Promise((resolve, reject) => {
    store
      .putProovedorDB(id, datos)
      .then((resp) => resolve(resp))
      .catch((err) => reject(err))
  })
}

module.exports = {
  getProovedors,
  getProovedor,
  postProovedor,
  putProovedor,
}
