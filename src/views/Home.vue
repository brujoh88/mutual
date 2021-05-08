<template>
  <div class="home">
    <ModalNewAfiliado />
    <TableAfiliado msg="Soy el padre(Home.vue)" />
  </div>
</template>

<script>
// @ is an alias to /src
import TableAfiliado from '@/components/PxTableAfiliado.vue'
import ModalNewAfiliado from '@/components/PxModalNewAfiliado.vue'

export default {
  name: 'Home',
  components: {
    TableAfiliado,
    ModalNewAfiliado,
  },
}
</script>
