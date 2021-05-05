const express = require('express')
const router = express.Router()
const response = require('../../network/response')
const controller = require('./controller')

router.get('/', function(req, res) {
  let legajo = req.query.legajo
  if (legajo === undefined) {
    controller
      .getAfiliados()
      .then((user) => {
        response.success(req, res, user, 200)
      })
      .catch((err) => {
        response.error(req, res, 'Unexpected error', 500, err)
      })
  } else {
    controller
      .getAfiliado(legajo)
      .then((user) => {
        response.success(req, res, user, 200)
      })
      .catch((err) => {
        response.error(req, res, 'Unexpected error', 500, err)
      })
  }
})

router.post('/', function(req, res) {
  let body = req.body
  controller
    .postAfiliado(body)
    .then((resp) => {
      response.success(req, res, resp, 201)
    })
    .catch((err) => {
      response.error(req, res, 'Unexpected error', 500, err)
    })
})

router.put('/', function(req, res) {
  let legajo = req.query.legajo
  let act = req.body
  controller
    .putAfiliado(legajo, act)
    .then((resp) => {
      response.success(req, res, resp, 201)
    })
    .catch((err) => {
      response.error(req, res, 'Unexpected error', 500, err)
    })
})

router.delete('/', function(req, res) {
  let legajo = req.query.legajo,
    cambioEstado = {
      estado: false,
    }
  controller
    .getAfiliado(legajo)
    .then((user) => {
      if (user === null || user[0].estado === false) {
        response.error(
          req,
          res,
          'Peticion incorrecta',
          500,
          'No existe ese afiliado'
        )
      }
      controller
        .putAfiliado(legajo, cambioEstado)
        .then((resp) => {
          response.success(req, res, resp, 201)
        })
        .catch((err) => {
          response.error(req, res, 'Unexpected error', 500, err)
        })
    })
    .catch((err) => {
      response.error(req, res, 'Peticion incorrecta', 500, err)
    })
})

module.exports = router
