const express = require('express')
const router = express.Router()
const response = require('../../network/response')
const controller = require('./controller')

router.get('/autoCuota', function(req, res) {
  controller
    .getAfiliadosAutoCuota()
    .then((afiliados) => {
      response.success(req, res, afiliados, 200)
    })
    .catch((err) => {
      response.error(req, res, 'Unexpected error', 500, err)
    })
})

router.get('/', function(req, res) {
  controller
    .getAfiliados()
    .then((afiliados) => {
      response.success(req, res, afiliados, 200)
    })
    .catch((err) => {
      response.error(req, res, 'Unexpected error', 500, err)
    })
})

router.get('/:id', function(req, res) {
  let id = req.params.id

  controller
    .getAfiliado(id)
    .then((user) => {
      response.success(req, res, user, 200)
    })
    .catch((err) => {
      response.error(req, res, 'Unexpected error', 500, err)
    })
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

router.put('/:id', function(req, res) {
  let id = req.params.id
  let act = req.body
  controller
    .putAfiliado(id, act)
    .then((resp) => {
      response.success(req, res, resp, 201)
    })
    .catch((err) => {
      response.error(req, res, 'Unexpected error', 500, err)
    })
})

router.delete('/:id', function(req, res) {
  let id = req.params.id,
    cambioEstado = {
      estado: false,
    }

  controller
    .getAfiliado(id)
    .then((user) => {
      if (user === null || user.estado === false) {
        response.error(
          req,
          res,
          'Peticion incorrecta',
          500,
          'No existe ese afiliado'
        )
      }
      controller
        .putAfiliado(id, cambioEstado)
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
