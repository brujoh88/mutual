const express = require('express')
const router = express.Router()
const response = require('../../network/response')
const controller = require('./controller')

router.get('/:fecha', function(req, res) {
  const DIA_SEMANA = {
    0: 'Domingo',
    1: 'Lunes',
    2: 'Martes',
    3: 'Miercoles',
    4: 'Jueves',
    5: 'Viernes',
    6: 'Sabado',
  }
  const MESES_DEL_ANIO = {
    0: 'Enero',
    1: 'Febrero',
    2: 'Marzo',
    3: 'Abril',
    4: 'Mayo',
    5: 'Junio',
    6: 'Julio',
    7: 'Agosto',
    8: 'Septiembre',
    9: 'Octubre',
    10: 'Noviembre',
    11: 'Diciembre',
  }

  const MOVIMIENTO_SEGUN_DIA_SEMANA = {
    Domingo: -2,
    Lunes: -3,
    Martes: -4,
    Miercoles: 2,
    Jueves: 1,
    Viernes: 0,
    Sabado: -1,
  }

  let fechaActual = new Date(req.params.fecha)
  let anioActual = fechaActual.getFullYear()
  let mesActual = fechaActual.getMonth()
  let diaActual = fechaActual.getDate()
  let diaSemanaActual = fechaActual.getDay()

  let numeroSemanaDiaDiez = new Date(anioActual, mesActual, 10).getDay()

  let diaSemanaDelDiez = DIA_SEMANA[numeroSemanaDiaDiez]

  let fechaCierreActual = new Date(
    anioActual,
    mesActual,
    10 + MOVIMIENTO_SEGUN_DIA_SEMANA[diaSemanaDelDiez]
  )

  res.json({
    fecha: fechaActual,
    diaActual,
    mesActual: MESES_DEL_ANIO[mesActual],
    diaSemanaActual: DIA_SEMANA[diaSemanaActual],
    numeroSemanaDiaDiez,
    fecha_cierre: fechaCierreActual,
  })
})

/* router.get('/', function(req, res) {
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

router.delete('/:id', function(req, res) {
  let id = req.params.id,
    cambioEstado = {
      estado: false,
    }

  controller
    .getProovedor(id)
    .then((proovedor) => {
      if (proovedor === null || proovedor.estado === false) {
        response.error(
          req,
          res,
          'Peticion incorrecta',
          500,
          'No existe ese proovedor'
        )
      }
      controller
        .putProovedor(id, cambioEstado)
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
}) */

module.exports = router
