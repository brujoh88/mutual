const express = require('express')
const router = express.Router()
const response = require('../../network/response')
const controller = require('./controller')

const Afiliado = require('../../models/afiliado')

router.get('/', function(req, res) {
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
  /* const filterMessage = req.query.user || null
  controller.getMessage(filterMessage)
    .then((messageList) => {
      response.success(req, res, messageList, 200)
    })
    .catch(e => {
      response.error(req, res, 'Unexpected error', 500, e)
    }) */
})

module.exports = router
