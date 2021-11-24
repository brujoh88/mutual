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

const calcularPeriodo = (fechaActual) => {
  return new Promise((resolve) => {
    let anioActual = fechaActual.getFullYear()
    let mesActual = fechaActual.getMonth()
    let diaActual = fechaActual.getDate()
    let diaSemanaActual = fechaActual.getDay()
    let fechaApertura
    let fechaCierre
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

    //! Caso particular pedido por EL SINDICATO=========================
    if (
      fechaActual.getMonth() === 10 &&
      diaActual > 13 &&
      anioActual === 2021
    ) {
      fechaCierre = new Date(anioActual, fechaActual.getMonth() + 1, 12)
    } else if (
      fechaActual.getMonth() === 11 &&
      anioActual === 2021 &&
      diaActual <= 12
    ) {
      fechaCierre = new Date(anioActual, fechaActual.getMonth(), 12)
      fechaApertura = new Date(2021, 10, 13)
    } else if (
      fechaActual.getMonth() === 11 &&
      anioActual === 2021 &&
      diaActual > 12
    ) {
      fechaApertura = new Date(anioActual, fechaActual.getMonth(), 12)
    }
    //!FIN=============================================================
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
