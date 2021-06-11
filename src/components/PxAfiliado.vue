<template>
  <div class="about">
    <div>
      <b-card-group deck>
        <b-card
          :header="`Legajo N° ${afiliado.legajo}`"
          header-tag="header"
          :footer="`Credito Asignado - $ ${afiliado.saldoAsignado}`"
          footer-tag="footer"
          :title="`${afiliado.nombre} ${afiliado.apellido}`"
        >
          <b-card-text>Credito Disponible: {{ saldoAfavor }}</b-card-text>

          <Orden
            :saldoDisponible="this.saldoAfavor"
            :idAfiliado="this.afiliado.id"
            :fechaCierre="this.cierre"
          />
        </b-card>
      </b-card-group>
    </div>
    <router-link to="/">
      <b-button class="mt-2" variant="primary">Volver</b-button>
    </router-link>
  </div>
</template>

<script>
import Orden from '@/components/PxModalOrden.vue'

export default {
  name: 'Afiliado',
  components: {
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
      ordenes: {},
    }
  },
  watch: {
    '$route.query.id': {
      immediate: true,
      handler(id) {
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
          .finally(() => console.log('peticion finalizada'))
        fetch(`http://localhost:3000/orden/${id}`)
          .then((response) => {
            return response.json()
          })
          .then((datos) => {
            let idOrden = ''
            for (let i = 0; i < datos.body.length; i++) {
              idOrden = datos.body[i]._id
              fetch(`http://localhost:3000/cuota/${idOrden}`)
                .then((response) => {
                  return response.json()
                })
                .then((datos) => {
                  console.log(datos)
                  for (let i = 0; i < datos.body.length; i++) {
                    let periodo = new Date(datos.body[i].periodo).getMonth()
                    let anioPeriodo = new Date(
                      datos.body[i].periodo
                    ).getFullYear()
                    let mesActual = new Date().getMonth()
                    let anioActual = new Date().getFullYear()
                    if (mesActual < periodo && anioPeriodo == anioActual) {
                      this.saldoAfavor += datos.body[i].monto
                    }
                  }
                  this.saldoAfavor =
                    this.afiliado.saldoAsignado - this.saldoAfavor
                })
                .catch((e) => console.log(e))
                .finally(console.log('finalizo'))
            }
            if (datos.body.length === 0) {
              this.saldoAfavor = this.afiliado.saldoAsignado
            }
            this.ordenes = datos
          })
          .catch((error) => {
            console.log(error)
          })
          .finally(() => console.log('peticion finalizada'))
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

<style></style>
