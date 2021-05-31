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
      saldoAfavor: 5000,
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
            /* for (let i = 0; i < datos.body.length; i++) {
              let date = datos.body[0].date
              date = new Date(date).getMonth()
              let hoy = new Date()
              if (date == hoy.getMonth()) {
                console.log('datos')
              }
            } */
            console.log(datos)
          })
          .catch((error) => {
            console.log(error)
          })
          .finally(() => console.log('peticion finalizada'))

        let fecha = new Date()
        fetch(`http://localhost:3000/calculoPeriodo/${fecha}`)
          .then((response) => {
            return response.json()
          })
          .then((datos) => {
            let fechaCierrePeriodo = new Date(datos.body.fechaCierre)
            console.log(fechaCierrePeriodo)
          })
          .catch((error) => {
            console.log(error)
          })
          .finally(() => console.log('genial termino'))
      },
    },
  },
}
</script>

<style></style>
