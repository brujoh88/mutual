<template>
  <div>
    <!-- Using value -->
    <b-button v-b-modal="'my-modal'" variant="success"
      >Agreguar Afiliado +</b-button
    >

    <!-- The modal -->
    <b-modal id="my-modal" centered title="Nuevo Afiliado" v-model="show"
      ><div>
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group id="input-group-0" label="Legajo:" label-for="input-0">
            <b-form-input
              id="input-0"
              v-model="form.legajo"
              placeholder="Ingrese el legajo aqui"
              :state="validationLegajo"
              required
            ></b-form-input>
            <b-form-invalid-feedback :state="validationLegajo">
              Ingrese solo numeros (debe ser unico)
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validationLegajo">
              Muy bien!
            </b-form-valid-feedback>
          </b-form-group>
          <b-form-group id="input-group-1" label="Nombre:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.nombre"
              placeholder="Ingrese el nombre aqui"
              :state="validationNombre"
              required
            ></b-form-input>
            <b-form-invalid-feedback :state="validationNombre">
              Solo texto
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validationNombre">
              Muy bien!
            </b-form-valid-feedback>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Apellido:"
            label-for="input-2"
            required
          >
            <b-form-input
              id="input-2"
              v-model="form.apellido"
              placeholder="Ingrese el apellido aqui"
              :state="validationApellido"
              required
            ></b-form-input>
            <b-form-invalid-feedback :state="validationApellido">
              Solo texto
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validationApellido">
              Muy bien!
            </b-form-valid-feedback>
          </b-form-group>

          <b-form-group id="input-group-3" label="DNI:" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="form.dni"
              placeholder="Ingrese el DNI aqui"
              :state="validationDni"
              required
            ></b-form-input>
            <b-form-invalid-feedback :state="validationDni">
              Ingrese solo numeros (debe ser unico)
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validationDni">
              Muy bien!
            </b-form-valid-feedback>
          </b-form-group>

          <b-form-group
            id="input-group-4"
            label="Saldo Asignado:"
            label-for="input-4"
          >
            <b-form-input
              id="input-4"
              v-model="form.saldoAsignado"
              placeholder="Ingrese el salgo a asignar"
              :state="validationSaldo"
              required
            ></b-form-input>
            <b-form-invalid-feedback :state="validationSaldo">
              Ingrese solo numeros (debe ser unico)
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validationSaldo">
              Muy bien!
            </b-form-valid-feedback>
          </b-form-group>

          <b-button
            type="submit"
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
  data() {
    return {
      form: {
        legajo: '',
        nombre: '',
        apellido: '',
        dni: '',
        saldoAsignado: '',
      },
      show: false,
      value: 0,
      max: 100,
    }
  },
  computed: {
    validationLegajo() {
      return /^[0-9]+$/.test(this.form.legajo)
    },
    validationDni() {
      return /^[0-9]+$/.test(this.form.dni)
    },
    validationApellido() {
      return /^[A-Za-z]+$/.test(this.form.apellido)
    },
    validationNombre() {
      return /^[A-Za-z]+$/.test(this.form.nombre)
    },
    validationSaldo() {
      return /^[0-9]+$/.test(this.form.saldoAsignado)
    },
    habilitarGuardar() {
      return !(
        /^[0-9]+$/.test(this.form.legajo) &&
        /^[0-9]+$/.test(this.form.dni) &&
        /^[A-Za-z]+$/.test(this.form.nombre) &&
        /^[A-Za-z]+$/.test(this.form.apellido) &&
        /^[0-9]+$/.test(this.form.saldoAsignado)
      )
    },
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      fetch('http://localhost:3000/afiliado', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
          legajo: this.form.legajo,
          nombre: this.form.nombre,
          apellido: this.form.apellido,
          dni: this.form.dni,
          saldoAsignado: this.form.saldoAsignado,
        }),
      })
        .then((response) => response.json())
        .then((element) => {
          if (element.error == '') {
            this.value = 100
            this.onReset()
            setTimeout(this.closeFrom, 1500)
          }
        })
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
      // Reset our form values
      this.form.legajo = ''
      this.form.nombre = ''
      this.form.apellido = ''
      this.form.dni = ''
      this.form.saldoAsignado = ''
      // Trick to reset/clear native browser form validation state
    },
  },
}
</script>

<style></style>
