const CONFIG = require('./helpers')
let fechaApertura
let fechaCierre

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
  Domingo: 6,
  Lunes: 5,
  Martes: 4,
  Miercoles: 3,
  Jueves: 2,
  Viernes: 1,
  Sabado: 0,
}

const MOVIMIENTO_SEGUN_DIA_SEMANA_AGUINALDO = {
  Domingo: 0,
  Lunes: 0,
  Martes: 0,
  Miercoles: 0,
  Jueves: 0,
  Viernes: 2,
  Sabado: 1,
}

const formatearFecha = (fecha) => {
  return {
    anioActual: fecha.getFullYear(),
    mesActual: fecha.getMonth(),
    diaActual: fecha.getDate(),
    diaSemanaActual: fecha.getDay(),
  }
}

const isCustomDay = (fecha) => {
  const fechaHoraCero = new Date(
    fecha.getFullYear(),
    fecha.getMonth(),
    fecha.getDate()
  )
  const { ...days } = CONFIG
  const cantIterar = Object.keys(days).length

  for (let i = 0; i < cantIterar; i++) {
    if (
      fechaHoraCero -
        new Date(days[i][0].anio, days[i][0].mes, days[i][0].dia) >
        0 &&
      fechaHoraCero -
        new Date(days[i][1].anio, days[i][1].mes, days[i][1].dia) <=
        0
    ) {
      fechaApertura = new Date(days[i][0].anio, days[i][0].mes, days[i][0].dia)
      fechaCierre = new Date(days[i][1].anio, days[i][1].mes, days[i][1].dia)
    }
  }
}

const calcularPeriodo = (fechaActual) => {
  return new Promise((resolve) => {
    let { anioActual, mesActual, diaActual, diaSemanaActual } = formatearFecha(
      fechaActual
    )

    if (mesActual == 5 || mesActual == 11) {
      let numeroSemanaDiaCinco = new Date(anioActual, mesActual, 5).getDay()
      let diaSemanaDelCinco = DIA_SEMANA[numeroSemanaDiaCinco]
      fechaApertura = new Date(
        anioActual,
        mesActual,
        5 + MOVIMIENTO_SEGUN_DIA_SEMANA_AGUINALDO[diaSemanaDelCinco]
      )
    } else {
      let numeroSemanaDiaDiez = new Date(anioActual, mesActual, 10).getDay()
      let diaSemanaDelDiez = DIA_SEMANA[numeroSemanaDiaDiez]
      fechaApertura = new Date(
        anioActual,
        mesActual,
        10 + MOVIMIENTO_SEGUN_DIA_SEMANA[diaSemanaDelDiez]
      )
    }

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
      if (mesActual == 4 || mesActual == 10) {
        mesActual = mesActual + 1
        let numeroSemanaDiaCinco = new Date(anioActual, mesActual, 5).getDay()
        let diaSemanaDelCinco = DIA_SEMANA[numeroSemanaDiaCinco]
        fechaCierre = new Date(
          anioActual,
          mesActual,
          5 + MOVIMIENTO_SEGUN_DIA_SEMANA_AGUINALDO[diaSemanaDelCinco]
        )
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
    }
    isCustomDay(fechaActual)
    resolve({
      fecha: fechaActual,
      diaActual,
      mesActual: MESES_DEL_ANIO[mesActual + 1],
      diaSemanaActual: DIA_SEMANA[diaSemanaActual],
      fechaApertura,
      fechaCierre,
    })
  })
}

module.exports = {
  calcularPeriodo,
}
