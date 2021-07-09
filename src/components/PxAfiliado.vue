<template>
  <div class="about">
    <div>
      <b-card-group deck>
        <b-card
          :header="`Legajo N° ${afiliado.legajo}`"
          header-tag="header"
          footer-tag="footer"
          :title="`${afiliado.apellido_nombre}`"
        >
          <b-card-text>Codigo: {{ afiliado.codigo }}</b-card-text>

          <b-card-text>DNI: {{ afiliado.dni }}</b-card-text>
          <b-card-text
            >Credito Asignado: ${{ afiliado.saldoAsignado }}</b-card-text
          >
          <b-card-text>Credito Disponible: ${{ saldoAfavor }}</b-card-text>
          <b-card-text>Detalle: {{ afiliado.detalle }}</b-card-text>

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
