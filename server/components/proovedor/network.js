const express = require('express')
const router = express.Router()
const response = require('../../network/response')
const controller = require('./controller')

router.get('/:id', function(req, res) {
  let idProovedor = req.params.id
  console.log(idProovedor)
  controller
    .getProovedor(idProovedor)
    .then((proovedor) => {
      response.success(req, res, proovedor, 200)
    })
    .catch((err) => {
      response.error(req, res, 'Unexpected error', 500, err)
    })
})

module.exports = router
