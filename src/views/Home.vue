<template>
  <div class="home">
    <b-row class="mt-5 mb-5">
      <b-col>
        <img
          alt="Mutual logo"
          src="../assets/logo.png"
          width="25%"
          class="mb-4 oculto-impresion"
      /></b-col>
      <b-card bg-variant="light" header="Fecha">
        <b-col>
          <b-card-text>
            <h5>{{ nombreDiaActual }}</h5>
          </b-card-text>
          <b-card-text>
            <h5>{{ diaActual }}</h5>
          </b-card-text>
        </b-col>
      </b-card>
      <b-card bg-variant="light" header="Período">
        <b-col>
          <b-card-text>
            <h5>Apertura: {{ fechaApertura }}</h5>
          </b-card-text>
          <b-card-text>
            <h5>Cierre: {{ fechaCierre }}</h5>
          </b-card-text>
        </b-col>
      </b-card>

      <b-col> </b-col>
    </b-row>

    <h3>Lista Afiliados</h3>

    <TableAfiliado :key="key1" :cierre="cierre">
      <ModalNewAfiliado v-on:isPost="forceRender" class="mb-3" />
    </TableAfiliado>
  </div>
</template>

<script>
// @ is an alias to /src
import TableAfiliado from '@/components/PxTableAfiliado.vue'
import ModalNewAfiliado from '@/components/PxModalNewAfiliado.vue'

const DIA_SEMANA = {
  0: 'Domingo',
  1: 'Lunes',
  2: 'Martes',
  3: 'Miercoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sabado',
}

export default {
  name: 'Home',
  components: {
    TableAfiliado,
    ModalNewAfiliado,
  },
  data() {
    return {
      key1: 0,
      fechaApertura: '',
      fechaCierre: '',
      cierre: '',
      diaActual: '',
      nombreDiaActual: '',
      montoCuota: '',
    }
  },
  methods: {
    forceRender() {
      this.key1 += 1
    },
  },
  mounted() {
    /*
    ==========================================
    ================PERIODO===================
    ==========================================
    */
    let fecha = new Date()
    let nameDia = fecha.getDay()
    this.nombreDiaActual = DIA_SEMANA[nameDia]
    this.diaActual = `${new Date().getDate()}/${new Date().getMonth() +
      1}/${new Date().getFullYear()}`
    fetch(`http://localhost:3000/calculoPeriodo/${fecha}`)
      .then((response) => {
        return response.json()
      })
      .then((datos) => {
        this.cierre = datos.body.fechaCierre

        let fechaAperturaPeriodo = new Date(datos.body.fechaApertura)
        let fechaCierrePeriodo = new Date(datos.body.fechaCierre)

        this.fechaApertura = `${fechaAperturaPeriodo.getDate() +
          1}/${fechaAperturaPeriodo.getMonth() +
          1}/${fechaAperturaPeriodo.getFullYear()}`
        this.fechaCierre = `${fechaCierrePeriodo.getDate()}/${fechaCierrePeriodo.getMonth() +
          1}/${fechaCierrePeriodo.getFullYear()}`

        /*
    ==========================================
    ===============GET=CONFIG=================
    ==========================================
    */
        fetch('http://localhost:3000/config/')
          .then((response) => {
            return response.json()
          })
          .then((datos) => {
            this.montoCuota = datos.body[0].cuota
            /*
    ==========================================
    ===========TAER/CREAR PROVEE OULTO========
    ==========================================
    */
            fetch('http://localhost:3000/proovedor/oculto')
              .then((response) => {
                return response.json()
              })
              .then((datos) => {
                if (datos.body === null) {
                  fetch('http://localhost:3000/proovedor', {
                    headers: { 'Content-Type': 'application/json' },
                    method: 'POST',
                    body: JSON.stringify({
                      nombre: 'CUOTA FIJA',
                      estado: false,
                    }),
                  })
                    .then((response) => response.json())
                    .then((element) => {
                      console.log(element)
                    })
                } else {
                  let periodo = new Date(this.cierre)
                  let mesPeriodo = periodo.getMonth()
                  let anio = periodo.getFullYear()

                  /*
          ==========================================
          ===========TAER=AFILIADO=AUTOCUOTA========
          ==========================================
          */
                  fetch('http://localhost:3000/afiliado/autoCuota')
                    .then((response) => {
                      return response.json()
                    })
                    .then((afiliados) => {
                      console.log(
                        'Afiliados con autocuota ',
                        afiliados.body.length
                      )
                      /*
              ==========================================
              ===========TAER/CREA=CUOTAS=FIJAS==============
              ==========================================
              */
                      fetch(
                        `http://localhost:3000/cuota/cuotaFija/${new Date(
                          anio,
                          mesPeriodo
                        )}/CUOTA FIJA`
                      )
                        .then((response) => response.json())
                        .then((cuotasFijas) => {
                          if (cuotasFijas.body == null) {
                            for (let i = 0; i < afiliados.body.length; i++) {
                              fetch('http://localhost:3000/orden', {
                                headers: { 'Content-Type': 'application/json' },
                                method: 'POST',
                                body: JSON.stringify({
                                  _afiliado: afiliados.body[i]._id,
                                  _proovedor: datos.body[0]._id,
                                  montoTotal: this.montoCuota,
                                  porcentaje: 0,
                                  cantidadCuota: 1,
                                }),
                              })
                                .then((response) => response.json())
                                .then((resp) => {
                                  fetch('http://localhost:3000/cuota', {
                                    headers: {
                                      'Content-Type': 'application/json',
                                    },
                                    method: 'POST',
                                    body: JSON.stringify({
                                      _afiliado: afiliados.body[i]._id,
                                      _orden: resp.body._id,
                                      monto: this.montoCuota,
                                      periodo: new Date(anio, mesPeriodo),
                                      detalle: 'CUOTA FIJA',
                                    }),
                                  })
                                    .then((response) => response.json())
                                    .then((element) => {
                                      if (element.error == '') {
                                        console.log('Se guardo las cuotas')
                                      } else {
                                        console.log('Error')
                                      }
                                    })
                                })
                            }
                            /*
                    ==========================================
                    ====CREA=CUOTAS=FIJAS=A=LOS=NUEVOS========
                    ==========================================
                    */
                          } else {
                            console.log(
                              'CUOTAS FIJAS ',
                              cuotasFijas.body.length
                            )
                            let arrIdAfiliado = []
                            let arrIdAfiliadoCuota = []
                            for (let i = 0; i < afiliados.body.length; i++) {
                              arrIdAfiliado.push(afiliados.body[i]._id)
                            }
                            for (let i = 0; i < cuotasFijas.body.length; i++) {
                              arrIdAfiliadoCuota.push(
                                cuotasFijas.body[i]._afiliado
                              )
                            }
                            for (let i = 0; i < arrIdAfiliado.length; i++) {
                              let id = arrIdAfiliado[i]
                              if (!arrIdAfiliadoCuota.includes(id)) {
                                fetch('http://localhost:3000/orden', {
                                  headers: {
                                    'Content-Type': 'application/json',
                                  },
                                  method: 'POST',
                                  body: JSON.stringify({
                                    _afiliado: id,
                                    _proovedor: datos.body[0]._id,
                                    montoTotal: this.montoCuota,
                                    cantidadCuota: 1,
                                    porcentaje: 0,
                                  }),
                                })
                                  .then((response) => response.json())
                                  .then((resp) => {
                                    fetch('http://localhost:3000/cuota', {
                                      headers: {
                                        'Content-Type': 'application/json',
                                      },
                                      method: 'POST',
                                      body: JSON.stringify({
                                        _afiliado: id,
                                        _orden: resp.body._id,
                                        monto: this.montoCuota,
                                        periodo: new Date(anio, mesPeriodo),
                                        detalle: 'CUOTA FIJA',
                                      }),
                                    })
                                      .then((response) => response.json())
                                      .then((element) => {
                                        if (element.error == '') {
                                          console.log('Se guardo las cuotas')
                                        } else {
                                          console.log('Error')
                                        }
                                      })
                                  })
                              }
                            }
                          }
                        })
                    })
                    .catch((error) => {
                      console.log(error)
                    })
                }
              })
              .catch((error) => {
                console.log(error)
              })
          })
          .catch((error) => {
            console.log(error)
          })
      })
      .catch((error) => {
        console.log(error)
      })
  },
}
</script>
