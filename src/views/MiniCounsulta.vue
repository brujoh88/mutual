<template>
  <b-container>
    <h1 class="mt-2 mr-2">Resumen del periodo {{ items[0].periodo }}</h1>
    <h2>{{ afiliado.apellido_nombre }} - {{ afiliado.legajo }}</h2>
    <b-button
      class="mt-2 mb-4 mr-2 oculto-impresion"
      variant="info"
      @click="imprimir"
      >Imprimir</b-button
    >
    <b-button
      class="mt-2 mb-4 oculto-impresion"
      variant="primary"
      @click="volver"
      >Volver</b-button
    >
    <b-table striped hover :items="items" :fields="fields" class="mt-4">
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
      <template #cell(button)="row">
        <router-link
          :to="{
            path: 'orden',
            query: {
              id: row.item._orden._id,
              detalle: row.item.detalle,
            },
          }"
        >
          <b-button size="sm" class="mr-2" variant="success">
            Cuota
          </b-button>
        </router-link>
      </template>
    </b-table>
    <h5>Subtotal ${{ subTotal }}</h5>
  </b-container>
</template>

<script>
export default {
  name: 'MiniConsulta',
  data() {
    return {
      items: {},
      afiliado: {},
      subTotal: 0,
      mes: 0,
      fields: [
        {
          key: 'id',
          label: 'Orden N°',
          sortable: true,
        },
        {
          key: 'detalle',
          label: 'Cuota',
          sortable: true,
        },
        {
          key: 'periodo',
          sortable: true,
        },
        { key: 'proveedor', sortable: true },
        { key: 'monto', sortable: true },
      ],
    }
  },
  methods: {
    volver() {
      this.$router.go(-1)
    },
    imprimir() {
      window.print()
    },
  },
  watch: {
    '$route.query.items': {
      immediate: true,
      handler(items) {
        let arr = []
        if (items === undefined) {
          arr.push([])
        } else {
          let consumos = JSON.parse(items)
          let camino = 0
          if (consumos[0].periodo[1] != '/') {
            this.mes = `${consumos[0].periodo[0]}` + `${consumos[0].periodo[1]}`
            camino = 1
          } else {
            this.mes = `${consumos[0].periodo[0]}`

            camino = 2
          }
          if (camino == 1) {
            for (let i = 0; i < consumos.length; i++) {
              if (
                consumos[0].periodo[0] == consumos[i].periodo[0] &&
                consumos[0].periodo[1] == consumos[i].periodo[1]
              ) {
                arr.push(consumos[i])
              }
            }
          } else {
            for (let i = 0; i < consumos.length; i++) {
              if (consumos[0].periodo[0] == consumos[i].periodo[0]) {
                arr.push(consumos[i])
              }
            }
          }
        }

        arr.forEach((element) => {
          this.subTotal += element.monto
        })

        this.items = arr
      },
    },
    '$route.query.afiliado': {
      immediate: true,
      handler(dato) {
        this.afiliado = JSON.parse(dato)
      },
    },
  },
}
</script>

<style></style>
