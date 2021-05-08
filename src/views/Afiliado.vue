<template>
  <div class="about">
    <h1>This is an Afiliado page</h1>
    <router-link to="/">
      <b-button class="mt-2" variant="primary">Volver</b-button>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  watch: {
    '$route.query.id': {
      immediate: true,
      handler(id) {
        console.log(id)
      },
    },
  },
}
</script>
