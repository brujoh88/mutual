<template>
  <b-container>
    <div>
      <div class="d-flex justify-content-center">
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
                placeholder="Ingrese el dato que desea encontrar"
                v-model="filter"
                type="search"
              ></b-form-input>

              <b-input-group-append>
                <b-button
                  :disabled="!filter"
                  @click="filter = ''"
                  variant="primary"
                  >Limpiar</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col lg="6" class="my-2"><slot></slot></b-col>
      </div>

      <b-table
        striped
        hover
        sticky-header
        filter-debounce="1000"
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
          <router-link
            :to="{
              path: 'afiliado',
              query: {
                id: row.item._id,
                fecha: cierre,
              },
            }"
          >
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
          key: 'autoCuota',
          label: 'Cuota',
          sortable: true,
        },
        {
          key: 'codigo',
          label: 'Código',
          sortable: true,
        },
        {
          key: 'legajo',
          sortable: true,
        },
        { key: 'apellido_nombre', label: 'Apellido y Nombres', sortable: true },
        { key: 'dni', label: 'DNI', sortable: true },
        { key: 'saldoAsignado', sortable: true },
        { key: 'detalle' },
        { key: 'button', label: 'Ir', sortable: false },
      ],
      items: null,
      isBusy: true,
      filter: null,
      towCodigos: {},
    }
  },
  props: {
    cierre: {
      type: String,
    },
  },
  mounted() {
    fetch('http://localhost:3000/config/')
      .then((response) => {
        return response.json()
      })
      .then((datos) => {
        this.towCodigos[`${datos.body[0]._codigo1._id}`] =
          datos.body[0]._codigo1.codigo1
        this.towCodigos[`${datos.body[0]._codigo2._id}`] =
          datos.body[0]._codigo2.codigo2

        fetch('http://localhost:3000/afiliado/')
          .then((response) => {
            return response.json()
          })
          .then((datos) => {
            this.items = datos.body
            this.formatearTabla()
          })
          .catch((error) => {
            console.log(error)
          })
          .finally(() => (this.isBusy = false))
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    formatearTabla() {
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].codigo = this.towCodigos[this.items[i].codigo]
        if (this.items[i].autoCuota) {
          this.items[i].autoCuota = 'SI'
        } else {
          this.items[i].autoCuota = 'NO'
        }
      }
    },
    rowClass() {
      /*rowClass(item, type) {
       if (!item || type !== 'row') return
      if (item.saldoAsignado > 10_000) {
        return 'table-success'
      } else {
        return 'table-warning'
      } */
    },
  },
}
</script>

<style></style>
