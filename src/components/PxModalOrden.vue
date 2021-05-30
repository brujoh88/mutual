<template>
  <div>
    <!-- Using value -->
    <b-button v-b-modal="'my-modal'" variant="success"
      >Agreguar Orden +</b-button
    >

    <!-- The modal -->
    <b-modal id="my-modal" centered title="Nuevo Orden" v-model="show"
      ><div>
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group id="input-group-0" label="Fecha:" label-for="input-0">
            <b-form-input
              id="input-0"
              v-model="form.fecha"
              readonly
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-1" label="Monto:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.monto"
              :placeholder="`Disponible ${saldoDisponible}`"
              :state="validationMonto"
              required
            ></b-form-input>
            <b-form-invalid-feedback :state="validationMonto">
              Solo numeros y un monto no superior a {{ saldoDisponible }}
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validationMonto">
              Muy bien!
            </b-form-valid-feedback>
          </b-form-group>

          <b-form-group
            id="input-group-list"
            label="Cuota/s:"
            label-for="input-list"
          >
            <b-form-select
              id="input-list"
              v-model="form.cuota"
              :options="cuotas"
              :state="validationCuota"
              required
            ></b-form-select>
            <b-form-invalid-feedback :state="validationCuota">
              Eliga una opcion
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validationCuota">
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
              Ingrese solo numeros
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
          <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
            Recuerde que debe ser fecha y dni unico para cada afiliado.
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
let fechaCompleta = new Date(),
  dia = fechaCompleta.getDate(),
  mes = fechaCompleta.getMonth() + 1,
  anio = fechaCompleta.getFullYear()
export default {
  name: 'ModalNewOrden',
  props: {
    saldoDisponible: {
      type: Number,
    },
  },
  data() {
    return {
      form: {
        fecha: `${dia}/${mes}/${anio}`,
        monto: '',
        cuota: null,
        dni: '',
        saldoAsignado: '',
      },
      cuotas: [
        { text: 'Eliga la cantidad de cuotas', value: null },
        1,
        2,
        3,
        4,
        5,
        6,
      ],

      show: false,
      value: 0,
      max: 100,
      showDismissibleAlert: false,
    }
  },
  computed: {
    validationDni() {
      return /^[0-9]+$/.test(this.form.dni)
    },
    validationCuota() {
      return this.form.cuota != null
    },
    validationMonto() {
      return this.saldoDisponible > this.form.monto && this.form.monto != 0
    },
    validationSaldo() {
      return /^[0-9]+$/.test(this.form.saldoAsignado)
    },
    habilitarGuardar() {
      return !(
        /^[0-9]+$/.test(this.form.fecha) &&
        /^[0-9]+$/.test(this.form.dni) &&
        /^[A-Za-z]+$/.test(this.form.monto) &&
        /^[A-Za-z]+$/.test(this.form.cuota) &&
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
          fecha: this.form.fecha,
          monto: this.form.monto,
          cuota: this.form.cuota,
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
      this.$emit('isPost')
    },
    onReset(event) {
      if (event != undefined) {
        event.preventDefault()
      }
      // Reset our form values
      this.form.monto = ''
      this.form.cuota = null
      this.form.dni = ''
      this.form.saldoAsignado = ''
      // Trick to reset/clear native browser form validation state
    },
  },
}
</script>

<style></style>
