<template>
  <b-container>
    <div>
      <p>HOLAAA FUNCIONA Y puedo decir desde el padre {{ msg }}</p>
      <b-table
        striped
        hover
        :items="items"
        :fields="fields"
        :tbody-tr-class="rowClass"
        :busy="isBusy"
      >
        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
        <template #cell(button)="row">
          <router-link :to="{ path: 'about', query: { id: row.item._id } }">
            <b-button size="sm" class="mr-2" variant="success">
              Ingresar
            </b-button>
          </router-link>
        </template>
      </b-table>
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'TableAfiliado',
  data() {
    return {
      fields: [
        {
          key: 'legajo',
          sortable: true,
        },
        { key: 'nombre', sortable: true },
        { key: 'apellido', sortable: true },
        { key: 'dni', sortable: true },
        { key: 'saldoAsignado', sortable: true },
        { key: 'button', label: 'Ir', sortable: false },
      ],
      items: null,
      isBusy: true,
    }
  },
  props: {
    msg: String,
  },
  mounted() {
    fetch('http://localhost:3000/afiliado/')
      .then((response) => {
        return response.json()
      })
      .then((datos) => {
        this.items = datos.body
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => (this.isBusy = false))
  },
  methods: {
    rowClass(item, type) {
      if (!item || type !== 'row') return
      if (item.saldoAsignado > 10_000) {
        return 'table-success'
      } else {
        return 'table-warning'
      }
    },
    detalle(id) {
      console.log(id)
    },
  },
}
</script>

<style></style>
