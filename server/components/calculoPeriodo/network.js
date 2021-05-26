const express = require('express')
const router = express.Router()
const response = require('../../network/response')
const controller = require('./controller')
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

router.get('/:fecha', function(req, res) {
  let fechaActual = new Date(req.params.fecha)
  let anioActual = fechaActual.getFullYear()
  let mesActual = fechaActual.getMonth()
  let diaActual = fechaActual.getDate()
  let diaSemanaActual = fechaActual.getDay()

  let numeroSemanaDiaDiez = new Date(anioActual, mesActual, 10).getDay()

  let diaSemanaDelDiez = DIA_SEMANA[numeroSemanaDiaDiez]

  let fechaApertura = new Date(
    anioActual,
    mesActual,
    10 + MOVIMIENTO_SEGUN_DIA_SEMANA[diaSemanaDelDiez]
  )
  let fechaCierre

  if (diaActual - fechaApertura.getDate() <= 0) {
    mesActual = mesActual - 1
    let numeroSemanaDiaDiez = new Date(anioActual, mesActual, 10).getDay()
    let diaSemanaDelDiez = DIA_SEMANA[numeroSemanaDiaDiez]
    fechaCierre = new Date(
      anioActual,
      mesActual,
      10 + MOVIMIENTO_SEGUN_DIA_SEMANA[diaSemanaDelDiez]
    )
    let intercambio = fechaCierre
    fechaCierre = fechaApertura
    fechaApertura = intercambio
  } else {
    mesActual = mesActual + 1
    let numeroSemanaDiaDiez = new Date(anioActual, mesActual, 10).getDay()
    let diaSemanaDelDiez = DIA_SEMANA[numeroSemanaDiaDiez]
    fechaCierre = new Date(
      anioActual,
      mesActual,
      10 + MOVIMIENTO_SEGUN_DIA_SEMANA[diaSemanaDelDiez]
    )
  }
  res.json({
    fecha: fechaActual,
    diaActual,
    mesActual: MESES_DEL_ANIO[mesActual],
    diaSemanaActual: DIA_SEMANA[diaSemanaActual],
    numeroSemanaDiaDiez,
    fechaApertura,
    fechaCierre,
  })
})

module.exports = router
