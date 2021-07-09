//const express = require('express')
const orden = require('../components/orden/network')
const afiliado = require('../components/afiliado/network')
const proovedor = require('../components/proovedor/network')
const cuota = require('../components/cuota/network')
const calculoPeriodo = require('../components/calculoPeriodo/network')
const configuracion = require('../components/configuracion/network')

const routes = function(server) {
  server.use('/orden', orden)
  server.use('/afiliado', afiliado)
  server.use('/proovedor', proovedor)
  server.use('/cuota', cuota)
  server.use('/calculoPeriodo', calculoPeriodo)
  server.use('/config', configuracion)
}

module.exports = routes
