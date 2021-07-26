<template>
  <div>
    <h1 class="mt-2 mr-2 oculto-impresion">Orden N° {{ id }}</h1>
    <b-button
      class="mt-2 mr-2 oculto-impresion"
      variant="info"
      @click="imprimir"
      >Imprimir</b-button
    >
    <b-button class="mt-2 oculto-impresion" variant="primary" @click="volver"
      >Volver</b-button
    >
    <div v-for="item in items" :key="item">
      <br /><br /><br /><br /><br /><br /><br /><br /><br />

      <px-orden-comprobante :lineaPuntos="false" :detalleAllCuota="item" />
      <px-orden-comprobante
        :lineaPuntos="true"
        :detalleAllCuota="item"
        :Duplicado="textDuplicado"
      />
      <br /><br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  </div>
</template>

<script>
import PxOrdenComprobante from '../components/PxOrdenComprobante.vue'
export default {
  components: { PxOrdenComprobante },
  data() {
    return { items: [], textDuplicado: 'DUPLICADO', id: '' }
  },
  methods: {
    volver() {
      this.$router.go(-1)
    },
    imprimir() {
      window.print()
    },
  },
  watch: {
    '$route.query.id': {
      immediate: true,
      handler(id) {
        this.id = id
      },
    },
    '$route.query.cant': {
      immediate: true,
      handler(cant) {
        for (let i = 0; i < cant; i++) {
          this.items.push(`${i + 1} de ${cant}`)
        }
      },
    },
  },
}
</script>

<style></style>
