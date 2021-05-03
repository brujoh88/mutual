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

const postAfiliadoDB = (body) => {
  return new Promise((resolve, reject) => {
    let afiliado = new Afiliado({
      nombre: body.nombre,
      apellido: body.apellido,
      dni: body.dni,
      legajo: body.legajo,
      saldoAsignado: body.saldoAsignado,
      estado: body.estado,
    })
    afiliado.save((err, newAfiliadoDB) => {
      if (err) {
        reject(err)
      }
      resolve(newAfiliadoDB)
    })
  })
}

module.exports = {
  getAfiliadoDB,
  postAfiliadoDB,
}
