const express = require('express')
const router = express.Router()
const response = require('../../network/response')
const controller = require('./controller')

router.get('/', function(req, res) {
  let legajo = req.query.legajo
  controller
    .getAfiliado(legajo)
    .then((user) => {
      response.success(req, res, user, 200)
    })
    .catch((err) => {
      response.error(req, res, 'Unexpected error', 500, err)
    })
})

module.exports = router

/*let afiliado = new Afiliado({
    nombre: 'Gustavo',
    apellido: 'Tiseira',
    dni: 33722424,
    legajo: 2697,
    saldoAsignado: 50000,
  })

  afiliado.save((err, afiliadoDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      })
    }
    res.json({
      ok: true,
      afiliado: afiliadoDB,
    })
  }) */
