<template>
  <div class="home">
    <h5>
      {{ diaActual }}
    </h5>
    <h5>Periodo [Apertura: {{ fechaApertura }} - Cierre: {{ fechaCierre }}]</h5>

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
    let fecha = new Date(2021, 8, 14)
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

        this.fechaApertura = `${fechaAperturaPeriodo.getDate()}/${fechaAperturaPeriodo.getMonth() +
          1}/${fechaAperturaPeriodo.getFullYear()}`
        this.fechaCierre = `${fechaCierrePeriodo.getDate()}/${fechaCierrePeriodo.getMonth() +
          1}/${fechaCierrePeriodo.getFullYear()}`
      })
      .catch((error) => {
        console.log(error)
      })

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
      })
      .catch((error) => {
        console.log(error)
      })

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
          let mesPeriodo = periodo.getMonth() + 1
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
              console.log('Afiliados AUTOCUOTA: ', afiliados)
              /*
              ==========================================
              ===========TAER/CREA=CUOTAS=FIJAS==============
              ==========================================
              */
              fetch(
                `http://localhost:3000/cuota/cuotaFija/${new Date(
                  anio,
                  mesPeriodo
                )}/fija`
              )
                .then((response) => response.json())
                .then((cuotasFijas) => {
                  console.log('cuotasFijas: ', cuotasFijas)
                  if (cuotasFijas.body == null) {
                    for (let i = 0; i < afiliados.body.length; i++) {
                      fetch('http://localhost:3000/orden', {
                        headers: { 'Content-Type': 'application/json' },
                        method: 'POST',
                        body: JSON.stringify({
                          _afiliado: afiliados.body[i]._id,
                          _proovedor: datos.body[0]._id,
                          montoTotal: this.montoCuota,
                          cantidadCuota: 1,
                        }),
                      })
                        .then((response) => response.json())
                        .then((resp) => {
                          fetch('http://localhost:3000/cuota', {
                            headers: { 'Content-Type': 'application/json' },
                            method: 'POST',
                            body: JSON.stringify({
                              _afiliado: afiliados.body[i]._id,
                              _orden: resp.body._id,
                              monto: this.montoCuota,
                              periodo: new Date(anio, mesPeriodo),
                              detalle: 'fija',
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
                    let arrIdAfiliado = []
                    let arrIdAfiliadoCuota = []
                    for (let i = 0; i < afiliados.body.length; i++) {
                      arrIdAfiliado.push(afiliados.body[i]._id)
                    }
                    for (let i = 0; i < cuotasFijas.body.length; i++) {
                      arrIdAfiliadoCuota.push(cuotasFijas.body[i]._afiliado)
                    }
                    for (let i = 0; i < arrIdAfiliado.length; i++) {
                      let id = arrIdAfiliado[i]
                      if (!arrIdAfiliadoCuota.includes(id)) {
                        fetch('http://localhost:3000/orden', {
                          headers: { 'Content-Type': 'application/json' },
                          method: 'POST',
                          body: JSON.stringify({
                            _afiliado: id,
                            _proovedor: datos.body[0]._id,
                            montoTotal: this.montoCuota,
                            cantidadCuota: 1,
                          }),
                        })
                          .then((response) => response.json())
                          .then((resp) => {
                            fetch('http://localhost:3000/cuota', {
                              headers: { 'Content-Type': 'application/json' },
                              method: 'POST',
                              body: JSON.stringify({
                                _afiliado: id,
                                _orden: resp.body._id,
                                monto: this.montoCuota,
                                periodo: new Date(anio, mesPeriodo),
                                detalle: 'fija',
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
  },
}
</script>
