<template>
  <div class="about">
    <h1>This is an Afiliado page</h1>
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
