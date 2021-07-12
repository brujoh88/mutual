const express = require('express')
const router = express.Router()
const response = require('../../network/response')
const controller = require('./controller')

router.get('/', function(req, res) {
  controller
    .getCuotas()
    .then((cuotas) => {
      response.success(req, res, cuotas, 200)
    })
    .catch((err) => {
      response.error(req, res, 'Unexpected error', 500, err)
    })
})

router.get('/:id', function(req, res) {
  let id = req.params.id
  controller
    .getCuota(id)
    .then((cuota) => {
      response.success(req, res, cuota, 200)
    })
    .catch((err) => {
      response.error(req, res, 'Unexpected error', 500, err)
    })
})

router.get('/deuda/:id', function(req, res) {
  let id = req.params.id
  controller
    .getCuotasByUser(id)
    .then((cuota) => {
      response.success(req, res, cuota, 200)
    })
    .catch((err) => {
      response.error(req, res, 'Unexpected error', 500, err)
    })
})

router.post('/', function(req, res) {
  let body = req.body
  controller
    .postCuota(body)
    .then((resp) => {
      response.success(req, res, resp, 201)
    })
    .catch((err) => {
      response.error(req, res, 'Unexpected error', 500, err)
    })
})

router.get('/cuotaFija/:periodo/:detalle', function(req, res) {
  let periodo = req.params.periodo
  let detalle = req.params.detalle
  controller
    .getCuotasFijas(periodo, detalle)
    .then((cuotas) => {
      response.success(req, res, cuotas, 200)
    })
    .catch((err) => {
      response.error(req, res, 'Unexpected error', 500, err)
    })
})

module.exports = router
