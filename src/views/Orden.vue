<template>
  <div class="mr-5 ml-5">
    <b-button
      class="mt-2 mr-2 oculto-impresion"
      variant="info"
      @click="imprimir"
      >Imprimir</b-button
    >
    <b-button class="mt-2 oculto-impresion" variant="primary" @click="volver"
      >Volver</b-button
    >
    <br /><br /><br /><br /><br /><br /><br />
    <px-orden-comprobante :lineaPuntos="false" />
    <px-orden-comprobante :Duplicado="textDuplicado" :lineaPuntos="true" />
  </div>
</template>

<script>
import PxOrdenComprobante from '../components/PxOrdenComprobante.vue'
export default {
  components: { PxOrdenComprobante },
  name: 'VisualizarOrden',
  data() {
    return {
      textDuplicado: 'DUPLICADO',
    }
  },
  methods: {
    volver() {
      this.$router.go(-1)
    },
    imprimir() {
      window.print()
    },
  },
}
</script>

<style></style>
