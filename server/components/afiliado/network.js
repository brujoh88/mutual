const express = require('express')
const router = express.Router()
const response = require('../../network/response')
const controller = require('./controller')

/* 
========================================
                Leer Afiliado
========================================
*/

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

router.post('/', function(req, res) {
  let body = req.body
  console.log(body)
  controller
    .postAfiliado(body)
    .then((resp) => {
      response.success(req, res, resp, 201)
    })
    .catch((err) => {
      response.error(req, res, 'Unexpected error', 500, err)
    })
})

module.exports = router
