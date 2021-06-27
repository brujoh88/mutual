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
}
</script>

<style></style>
