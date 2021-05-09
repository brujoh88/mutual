<template>
  <div class="home">
    <ModalNewAfiliado v-on:isPost="forceRender" class="mb-3" />
    <TableAfiliado :key="key1" />
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
  data() {
    return {
      key1: 0,
    }
  },
  methods: {
    forceRender() {
      this.key1 += 1
    },
  },
}
</script>
