const express = require('express')
const router = express.Router()
const response = require('../../network/response')
const controller = require('./controller')

/* router.post('/', upload.single('file'), function (req, res) {
  controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file)
      .then((fullMessage) => {
          response.success(req, res, fullMessage, 201)
      })
      .catch(e => {
          response.error(req, res, 'Invalid information', 400, 'Login error')
      })
})

router.patch('/:id', function (req, res) {
  console.log(req.params.id)
  controller.updateMessage(req.params.id, req.body.message)
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch(e => {
      response.error(req, res, 'Internal Error', 500, e)
    })
})

router.delete('/:id', function(req, res) {
  controller.deleteMessage(req.params.id)
    .then(() => {
      response.success(req, res, `Usuario ${req.params.id} eliminado`, 200)
    })
    .catch(e => {
      response.error(req, res, 'Interna error', 500, e)
    })
}) */

module.exports = router
