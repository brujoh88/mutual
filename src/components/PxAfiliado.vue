<template>
  <div class="about">
    <div>
      <b-card-group deck>
        <b-card
          header-tag="header"
          footer-tag="footer"
          :title="`${afiliado.apellido_nombre}`"
        >
          <b-row class="mt-5 mb-5">
            <b-col> </b-col>
            <b-card bg-variant="light" header="Datos personales">
              <b-col>
                <b-card-text> Legajo N° {{ afiliado.legajo }} </b-card-text>
                <b-card-text>Código: {{ codigoValue }}</b-card-text>

                <b-card-text>DNI: {{ afiliado.dni }}</b-card-text>
                <b-card-text
                  >Observaciones:
                  {{ afiliado.detalle || 'SIN DETALLE' }}</b-card-text
                >
              </b-col>
            </b-card>
            <b-card bg-variant="light" header="Resúmen de crédito">
              <b-col>
                <b-card-text
                  >Crédito Asignado: ${{ afiliado.saldoAsignado }}</b-card-text
                >
                <b-card-text
                  >Crédito Disponible: ${{ saldoAfavor }}</b-card-text
                >
              </b-col>
            </b-card>

            <b-col> </b-col>
          </b-row>

          <slot></slot>
        </b-card>
      </b-card-group>
    </div>
    <router-link to="/">
      <b-button class="mt-2" variant="primary">Volver</b-button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Afiliado',
  props: {
    afiliado: {
      type: Object,
    },
    saldoAfavor: {
      type: Number,
    },
  },
  data() {
    return {
      codigoValue: '',
    }
  },
  mounted() {
    fetch('http://localhost:3000/config/')
      .then((response) => {
        return response.json()
      })
      .then((datos) => {
        if (this.afiliado.codigo == datos.body[0]._codigo1._id) {
          this.codigoValue = datos.body[0]._codigo1.codigo1
        } else {
          this.codigoValue = datos.body[0]._codigo2.codigo2
        }
      })
      .catch((error) => {
        console.log(error)
      })
  },
}
</script>

<style></style>
