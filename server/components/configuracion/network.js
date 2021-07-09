const express = require('express')
const router = express.Router()
const response = require('../../network/response')
const controller = require('./controller')

router.get('/', function(req, res) {
  controller
    .getConfig()
    .then((config) => {
      response.success(req, res, config, 200)
    })
    .catch((err) => {
      response.error(req, res, 'Unexpected error', 500, err)
    })
})

router.post('/', function(req, res) {
  let body = req.body
  controller
    .postConfig(body)
    .then((resp) => {
      response.success(req, res, resp, 201)
    })
    .catch((err) => {
      response.error(req, res, 'Unexpected error', 500, err)
    })
})

router.put('/:id', function(req, res) {
  let idConfig = req.params.id
  let act = req.body
  controller
    .putConfig(idConfig, act)
    .then((resp) => {
      response.success(req, res, resp, 201)
    })
    .catch((err) => {
      response.error(req, res, 'Unexpected error', 500, err)
    })
})

module.exports = router
