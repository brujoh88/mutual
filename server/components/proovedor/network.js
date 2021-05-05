const express = require('express')
const router = express.Router()
const response = require('../../network/response')
const controller = require('./controller')

router.get('/', function(req, res) {
  controller
    .getProovedors()
    .then((proovedor) => {
      response.success(req, res, proovedor, 200)
    })
    .catch((err) => {
      response.error(req, res, 'Unexpected error', 500, err)
    })
})

router.get('/:id', function(req, res) {
  let idProovedor = req.params.id
  controller
    .getProovedor(idProovedor)
    .then((proovedor) => {
      response.success(req, res, proovedor, 200)
    })
    .catch((err) => {
      response.error(req, res, 'Unexpected error', 500, err)
    })
})

router.post('/', function(req, res) {
  let body = req.body
  controller
    .postProovedor(body)
    .then((resp) => {
      response.success(req, res, resp, 201)
    })
    .catch((err) => {
      response.error(req, res, 'Unexpected error', 500, err)
    })
})

router.put('/:id', function(req, res) {
  let idProovedor = req.params.id
  let act = req.body
  controller
    .putProovedor(idProovedor, act)
    .then((resp) => {
      response.success(req, res, resp, 201)
    })
    .catch((err) => {
      response.error(req, res, 'Unexpected error', 500, err)
    })
})

module.exports = router
