//const express = require('express')
const componenteModelo = require('../components/componenteModelo/network')
const afiliado = require('../components/afiliado/network')
const proovedor = require('../components/proovedor/network')

const routes = function(server) {
  server.use('/componenteModelo', componenteModelo)
  server.use('/afiliado', afiliado)
  server.use('/proovedor', proovedor)
}

module.exports = routes
