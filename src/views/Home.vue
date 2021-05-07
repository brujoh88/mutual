<template>
  <div class="home">
    <TableAfiliado msg="Soy el padre(Home.vue)" />
  </div>
</template>

<script>
// @ is an alias to /src
import TableAfiliado from '@/components/PxTableAfiliados.vue'
export default {
  name: 'Home',
  components: {
    TableAfiliado,
  },
}
</script>
