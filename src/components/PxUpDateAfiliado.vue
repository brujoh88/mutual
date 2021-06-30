<template>
  <div>
    <!-- Using value -->
    <b-button v-b-modal="'my-modalp'" variant="warning" @click="llenarForm"
      >Actualizar afiliado</b-button
    >

    <!-- The modal -->
    <b-modal id="my-modalp" centered title="Actualizar Afiliado" v-model="show"
      ><div>
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group
            id="input-group-0p"
            label="Legajo:"
            label-for="input-0p"
          >
            <b-form-input
              id="input-0p"
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
          <b-form-group
            id="input-group-1p"
            label="Nombre:"
            label-for="input-1p"
          >
            <b-form-input
              id="input-1p"
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
            id="input-group-2p"
            label="Apellido:"
            label-for="input-2p"
            required
          >
            <b-form-input
              id="input-2p"
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

          <b-form-group id="input-group-3p" label="DNI:" label-for="input-3p">
            <b-form-input
              id="input-3p"
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
            id="input-group-4p"
            label="Saldo Asignado:"
            label-for="input-4p"
          >
            <b-form-input
              id="input-4p"
              v-model="form.saldoAsignado"
              placeholder="Ingrese el salgo a asignar"
              :state="validationSaldo"
              required
            ></b-form-input>
            <b-form-invalid-feedback :state="validationSaldo">
              Ingrese solo numeros
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validationSaldo">
              Muy bien!
            </b-form-valid-feedback>
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
            Recuerde que debe ser legajo y dni unico para cada afiliado.
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
  name: 'ModalUpDateAfiliado',
  props: {
    afiliado: {
      type: Object,
    },
  },
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
      showDismissibleAlert: false,
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
    llenarForm() {
      this.form.apellido = this.afiliado.apellido
      this.form.dni = this.afiliado.dni
      this.form.legajo = this.afiliado.legajo
      this.form.nombre = this.afiliado.nombre
      this.form.saldoAsignado = this.afiliado.saldoAsignado
    },
    estoySeguro() {
      this.$bvModal
        .msgBoxConfirm(
          `Se va actualizar a los siguientes datos ${this.form.nombre} ${this.form.apellido} con numero de legajo N°${this.form.legajo} y DNI ${this.form.dni}. Asignandole un monto de credito de $${this.form.saldoAsignado}. ¿Esta seguro?`,
          {
            title: 'Confirmacion de actualizacion',
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
      fetch(`http://localhost:3000/afiliado/${this.afiliado.id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
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
          } else {
            this.showDismissibleAlert = true
          }
        })
    },
    closeFrom() {
      this.show = false
      this.value = 0
      this.$emit('isUpDate')
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
