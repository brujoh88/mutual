<template>
  <div class="home">
    {{ dia }}
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
      dia: '',
    }
  },
  methods: {
    forceRender() {
      this.key1 += 1
    },
  },
  mounted() {
    let fecha = new Date()
    fetch(`http://localhost:3000/calculoPeriodo/${fecha}`)
      .then((response) => {
        return response.json()
      })
      .then((datos) => {
        let fechaCierrePeriodo = new Date(datos.fecha_cierre)
        this.dia = fechaCierrePeriodo
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => console.log('genial termino'))
  },
}
</script>
