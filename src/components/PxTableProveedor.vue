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
        v-if="show"
        striped
        hover
        sticky-header="400px"
        filter-debounce="1000"
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
              @click="
                cambiarNombre(
                  row.item._id,
                  row.item.nombre,
                  row.item.descripcion
                )
              "
              size="sm"
              class="mr-2"
              variant="success"
              >Editar</b-button
            >
          </div>
        </template>
      </b-table>

      <b-form @submit="onSubmit" @reset="onReset" v-if="!show">
        <b-form-group
          id="input-group-1"
          label="Nombre:"
          label-for="input-1"
          description="Cambie el nombre por el cual desea actualizar su nombre anterior."
        >
          <b-form-input
            :state="validationNombre"
            id="input-1"
            v-model="form.nombre"
            required
          ></b-form-input>
          <b-form-invalid-feedback :state="validationNombre">
            Son los mismos datos!
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validationNombre">
            Muy bien, ahora solo actualice!
          </b-form-valid-feedback>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="Descripción:"
          label-for="input-2"
          description="Puede colocar alguna descripción si lo desea"
        >
          <b-form-input
            id="input-2"
            :state="validationNombre"
            v-model="form.descripcion"
          ></b-form-input>
          <b-form-invalid-feedback :state="validationNombre">
            Son los mismos datos!
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validationNombre">
            Muy bien, ahora solo actualice!
          </b-form-valid-feedback>
        </b-form-group>

        <b-button
          @click="estoySeguro"
          variant="success"
          class="mr-3"
          :disabled="habilitarGuardar"
          >Actualizar</b-button
        >
        <b-button type="reset" variant="danger">Cancelar</b-button>
        <b-progress
          :value="value"
          :max="max"
          show-progress
          animated
          class="mt-2"
        ></b-progress>
      </b-form>
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
        {
          key: 'descripcion',
          label: 'Descripción',
          sortable: true,
        },
        { key: 'button', label: 'Editar', sortable: false },
      ],

      items: null,
      isBusy: true,
      filter: null,
      form: {
        nombre: '',
        descripcion: '',
      },
      show: true,
      value: 0,
      max: 100,
      id: '',
      nombreRam: '',
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
    cambiarNombre(id, proveedorName, detalleProveedor) {
      this.show = !this.show
      this.id = id
      this.form.nombre = proveedorName
      this.form.descripcion = detalleProveedor
      this.nombreRam = proveedorName
      this.descripcionRam = detalleProveedor
    },
    estoySeguro() {
      this.$bvModal
        .msgBoxConfirm(
          `Cambiara el nombre del proveedor ${this.nombreRam} a ${this.form.nombre}. ¿Esta seguro?`,
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
    onSubmit() {
      if (this.form.descripcion != '') {
        fetch(`http://localhost:3000/proovedor/${this.id}`, {
          headers: { 'Content-Type': 'application/json' },
          method: 'PUT',
          body: JSON.stringify({
            nombre: this.form.nombre,
            descripcion: this.form.descripcion,
          }),
        })
          .then((response) => response.json())
          .then((element) => {
            if (element.error == '') {
              this.value = 100
              setTimeout(this.closeFrom, 1500)
            } else {
              this.showDismissibleAlert = true
            }
          })
      } else {
        fetch(`http://localhost:3000/proovedor/${this.id}`, {
          headers: { 'Content-Type': 'application/json' },
          method: 'PUT',
          body: JSON.stringify({
            nombre: this.form.nombre,
            descripcion: 'Sin descripcion',
          }),
        })
          .then((response) => response.json())
          .then((element) => {
            if (element.error == '') {
              this.value = 100
              setTimeout(this.closeFrom, 1500)
            } else {
              this.showDismissibleAlert = true
            }
          })
      }
    },

    closeFrom() {
      this.show = !this.show
      this.value = 0
      this.$emit('isPost')
    },
    onReset() {
      this.show = !this.show
    },
  },
  computed: {
    validationNombre() {
      return (
        (/^[0-9A-Za-z\s]+$/.test(this.form.nombre) &&
          this.nombreRam != this.form.nombre) ||
        this.form.descripcion != this.descripcionRam
      )
    },
    habilitarGuardar() {
      return !(
        (/^[0-9A-Za-z\s]+$/.test(this.form.nombre) &&
          this.nombreRam != this.form.nombre) ||
        this.form.descripcion != this.descripcionRam
      )
    },
  },
}
</script>

<style></style>
