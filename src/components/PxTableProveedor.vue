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
        :filter="filter"
        :items="items"
        :fields="fields"
        :busy="isBusy"
      >
        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>

        <template #cell(button)="row">
          <div>
            <!-- Using value -->
            <b-button
              @click="cambiarNombre(row.item.nombre)"
              size="sm"
              class="mr-2"
              variant="success"
              >Editar</b-button
            >
          </div>
        </template>
      </b-table>
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'TableProveedor',
  data() {
    return {
      fields: [
        {
          key: 'nombre',
          sortable: true,
        },
        { key: 'button', label: 'Editar', sortable: false },
      ],

      items: null,
      isBusy: true,
      filter: null,
    }
  },
  mounted() {
    fetch('http://localhost:3000/proovedor/')
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
    cambiarNombre(proveedorName) {
      let nombreNuevo = prompt('Edite el nombre', proveedorName)
      if (nombreNuevo == null || nombreNuevo == '') {
        console.log('Todo mal')
      } else {
        this.estoySeguro(proveedorName, nombreNuevo)
      }
    },
    estoySeguro(proveedorName, nombreNuevo) {
      this.$bvModal
        .msgBoxConfirm(
          `Cambiara el nombre del proveedor de ${proveedorName} a ${nombreNuevo}. ¿Esta seguro?`,
          {
            title: 'Confirmacion de orden',
            size: 'sm',
            buttonSize: 'sm',
            okVariant: 'danger',
            okTitle: 'SI',
            cancelTitle: 'NO',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true,
          }
        )
        .then((value) => {
          if (value) {
            this.onSubmit()
          } else {
            this.onReset()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  computed: {},
}
</script>

<style></style>
