const express = require('express')
const componenteModelo = require('../components/componenteModelo/network')
const otroComponente = require('../components/otroComponente/network')

const routes = function (server) {
	server.use('/componenteModelo', componenteModelo)
	server.use('/otroComponente', otroComponente)
}

module.exports = routes
