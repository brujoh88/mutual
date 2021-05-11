<template>
  <b-container>
    <div>
      <b-col lg="6" class="my-2">
        <b-form-group
          label="Buscar"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          class="mb-0"
        >
          <b-input-group>
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''" variant="info"
                >Limpiar</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-table
        striped
        hover
        :filter="filter"
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
          <router-link :to="{ path: 'afiliado', query: { id: row.item._id } }">
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
      filter: null,
    }
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
  },
}
</script>

<style></style>
