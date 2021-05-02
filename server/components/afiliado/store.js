const Afiliado = require('../../models/afiliado')

//Devuelve unndefined porque esta siendo una funcino de funcion

const getAfiliadoDB = (legajo) => {
  Afiliado.find({ legajo: legajo }).exec((err, afiliadoDB) => {
    if (err) {
      return err
    }
    return afiliadoDB
  })
}

module.exports = {
  getAfiliadoDB,
}
