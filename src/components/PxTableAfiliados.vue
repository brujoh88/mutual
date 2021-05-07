<template>
  <div>
    <p>HOLAAA FUNCIONA Y puedo decir desde el padre {{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: 'TableAfiliado',
  data() {
    return { items: null }
  },
  props: {
    msg: String,
  },
  mounted() {
    fetch('http://localhost:3000/afiliado/')
      .then((response) => {
        return response.json()
      })
      .then((datos) => (this.items = datos.body))
      .catch((error) => {
        console.log(error)
      })
    /* .finally(() => this.loading = false) */
  },
}
</script>

<style></style>
