<template>
  <div>
    <!-- Using value -->
    <b-button v-b-modal="'my-modal'" variant="success"
      >Agregar Proveedor +</b-button
    >

    <!-- The modal -->
    <b-modal id="my-modal" centered title="Nuevo Proveedor" v-model="show"
      ><div>
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group id="input-group-0" label="Nombre:" label-for="input-0">
            <b-form-input
              id="input-0"
              v-model="form.nombre"
              placeholder="Ingrese el nombre aqui"
              :state="validationNombre"
              required
            ></b-form-input>
            <b-form-invalid-feedback :state="validationNombre">
              No puede estar vacio
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validationNombre">
              Muy bien!
            </b-form-valid-feedback>
          </b-form-group>
          <b-form-group
            id="input-group-1"
            label="Descripcion:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.descripcion"
              placeholder="Descripcion de local"
            ></b-form-input>
          </b-form-group>
          <b-button
            @click="estoySeguro"
            variant="success"
            class="mr-3"
            :disabled="habilitarGuardar"
            >Guardar</b-button
          >
          <b-button type="reset" variant="warning">Resetear</b-button>
          <b-progress
            :value="value"
            :max="max"
            show-progress
            animated
            class="mt-2"
          ></b-progress>
          <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
            Recuerde que el nombre asignado para el proveedor debe ser unico.
          </b-alert>
        </b-form>
      </div>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="danger"
            size="sm"
            class="float-right"
            @click="show = false"
          >
            Cerrar
          </b-button>
        </div>
      </template></b-modal
    >
  </div>
</template>

<script>
export default {
  name: 'ModalNewProveedor',
  data() {
    return {
      form: {
        nombre: '',
        descripcion: '',
      },
      show: false,
      value: 0,
      max: 100,
      showDismissibleAlert: false,
    }
  },
  computed: {
    validationNombre() {
      return this.form.nombre != ''
    },
    habilitarGuardar() {
      return !this.form.nombre != ''
    },
  },
  methods: {
    estoySeguro() {
      this.$bvModal
        .msgBoxConfirm(
          `Se va agregar al el proveedor ${this.form.nombre}. ¿Esta seguro?`,
          {
            title: 'Confirmacion de proveedor',
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
        fetch('http://localhost:3000/proovedor', {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify({
            nombre: this.form.nombre,
            descripcion: this.form.descripcion,
          }),
        })
          .then((response) => response.json())
          .then((element) => {
            if (element.error == '') {
              this.value = 100
              this.onReset()
              setTimeout(this.closeFrom, 1500)
            } else {
              this.showDismissibleAlert = true
            }
          })
      } else {
        fetch('http://localhost:3000/proovedor', {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify({
            nombre: this.form.nombre,
          }),
        })
          .then((response) => response.json())
          .then((element) => {
            if (element.error == '') {
              this.value = 100
              this.onReset()
              setTimeout(this.closeFrom, 1500)
            } else {
              this.showDismissibleAlert = true
            }
          })
      }
    },
    closeFrom() {
      this.show = false
      this.value = 0
      this.$emit('isPost')
    },
    onReset(event) {
      if (event != undefined) {
        event.preventDefault()
      }
      this.form.nombre = ''
    },
  },
}
</script>

<style></style>
