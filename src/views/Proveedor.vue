<template>
  <div class="about">
    <h3>Lista Proveedores</h3>
    <table-proveedor :key="key1" v-on:isPost="forceRender">
      <modal-new-proveedor v-on:isPost="forceRender" class="mb-3" />
    </table-proveedor>
  </div>
</template>
<script>
import TableProveedor from '@/components/PxTableProveedor.vue'
import ModalNewProveedor from '@/components/PxModalNewProveedor.vue'

export default {
  name: 'ViewProveedor',
  components: {
    ModalNewProveedor,
    TableProveedor,
  },
  data() {
    return { key1: 0 }
  },
  methods: {
    forceRender() {
      this.key1 += 1
    },
  },
  mounted() {},
}
</script>
