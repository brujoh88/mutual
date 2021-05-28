<template>
  <div class="home">
    {{ new Date().getDate() }}/{{ new Date().getMonth() + 1 }}/{{
      new Date().getFullYear()
    }}
    <br />
    Periodo [Apertura: {{ fechaApertura }} - Cierre: {{ fechaCierre }}]
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
      fechaApertura: '',
      fechaCierre: '',
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
        console.log(datos)
        let fechaAperturaPeriodo = new Date(datos.body.fechaApertura)
        let fechaCierrePeriodo = new Date(datos.body.fechaCierre)

        this.fechaApertura = `${fechaAperturaPeriodo.getDate()}/${fechaAperturaPeriodo.getMonth() +
          1}/${fechaAperturaPeriodo.getFullYear()}`
        this.fechaCierre = `${fechaCierrePeriodo.getDate()}/${fechaCierrePeriodo.getMonth() +
          1}/${fechaCierrePeriodo.getFullYear()}`
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => console.log('genial termino'))
  },
}
</script>
