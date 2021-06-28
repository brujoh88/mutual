<template>
  <Afiliado :afiliado="afiliado" :saldoAfavor="saldoAfavor" :key="key2">
    <Orden
      v-on:newOrden="forceRender"
      :saldoDisponible="this.saldoAfavor"
      :idAfiliado="this.afiliado.id"
      :fechaCierre="this.cierre"
    />
  </Afiliado>
</template>

<script>
import Afiliado from '@/components/PxAfiliado.vue'
import Orden from '@/components/PxModalOrden.vue'

export default {
  name: 'PlanillaAfiliado',
  components: {
    Afiliado,
    Orden,
  },
  data() {
    return {
      afiliado: {
        id: '',
        legajo: '',
        nombre: '',
        apellido: '',
        dni: '',
        saldoAsignado: '',
      },
      cierre: '',
      saldoAfavor: null,
      acumulador: 0,
      key2: 0,
    }
  },
  methods: {
    forceRender() {
      this.calcularSaldo()
      this.key1 += 1
    },
    calcularSaldo(id) {
      if (id === undefined) {
        id = this.afiliado.id
      }
      fetch(`http://localhost:3000/cuota/deuda/${id}`)
        .then((response) => {
          return response.json()
        })
        .then((datos) => {
          if (datos.body.length != 0) {
            for (let i = 0; i < datos.body.length; i++) {
              this.acumulador = this.acumulador + datos.body[i].monto
            }
            this.saldoAfavor = this.afiliado.saldoAsignado - this.acumulador
          } else {
            this.saldoAfavor = this.afiliado.saldoAsignado
          }
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => console.log('Finalizo'))
    },
  },
  watch: {
    '$route.query.id': {
      immediate: true,
      handler(id) {
        /* this.acumulador = 0 */
        fetch(`http://localhost:3000/afiliado/${id}`)
          .then((response) => {
            return response.json()
          })
          .then((datos) => {
            this.afiliado.id = datos.body._id
            this.afiliado.legajo = datos.body.legajo
            this.afiliado.nombre = datos.body.nombre
            this.afiliado.apellido = datos.body.apellido
            this.afiliado.dni = datos.body.dni
            this.afiliado.saldoAsignado = datos.body.saldoAsignado
          })
          .catch((error) => {
            console.log(error)
          })
          .finally(() => this.calcularSaldo(id))
      },
    },
    '$route.query.fecha': {
      immediate: true,
      handler(fecha) {
        this.cierre = fecha
      },
    },
  },
}
</script>
