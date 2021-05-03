const Afiliado = require('../../models/afiliado')

//Devuelve unndefined porque esta siendo una funcino de funcion

const getAfiliadoDB = (legajo) => {
  return new Promise((resolve, reject) => {
    Afiliado.find({ legajo: legajo }).exec((err, afiliadoDB) => {
      if (err) {
        reject(err)
      }
      if (afiliadoDB.length != 0) {
        resolve(afiliadoDB)
      }
      resolve(null)
    })
  })
}

module.exports = {
  getAfiliadoDB,
}
