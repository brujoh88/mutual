const express = require('express')
const router = express.Router()
const response = require('../../network/response')
const controller = require('./controller')

router.get('/:fecha', function(req, res) {
  let fechaActual = new Date(req.params.fecha)
  controller
    .calcularPeriodo(fechaActual)
    .then((periodo) => {
      response.success(req, res, periodo, 200)
    })
    .catch((err) => {
      response.error(req, res, 'Error en el calculo de periodo', 500, err)
    })
})

module.exports = router
